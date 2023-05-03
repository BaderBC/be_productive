import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { AddActivityDto } from './dto/addActivity.dto';
import { PatchActivityDto } from './dto/patchActivity.dto';
import { ActivityType } from './dto/activity.type';
import moment from 'moment-timezone';

interface CreateActivitySessionInterface {
  id: number;
  time_to_spend_weekly: number;
}
@Injectable()
export class ActivitiesService {
  // TODO: when creating a new week_session_activity remove activity saves older than 1 year

  private fieldsToSelect = {
    time_to_spend_weekly: true,
    time_spent_ms: true,
    session_start: true,
    is_active: true,
    activities: {
      select: {
        id: true,
        name: true,
        description: true,
      },
    },
  };

  constructor(private prisma: PrismaService) {}

  async addActivity(addActivityDto: AddActivityDto, userId: number) {
    await this.prisma.activities.create({
      data: {
        name: addActivityDto.name,
        description: addActivityDto.description,
        time_to_spend_weekly: addActivityDto.time_to_spend_weekly,
        user_id: userId,
      },
    });
  }

  async updateActivityInfo(
    patchActivityDto: PatchActivityDto,
    userId: number,
    timezone: string,
  ) {
    const { activityId: id, time_to_spend_weekly } = patchActivityDto;
    delete patchActivityDto.activityId;
    delete patchActivityDto.time_to_spend_weekly;

    const local_date = moment.tz(timezone);

    const query1 = this.prisma.activities.updateMany({
      where: { id, user_id: userId },
      data: patchActivityDto,
    });
    const query2 = async () => {
      if (time_to_spend_weekly) {
        return this.prisma.activity_week_session.updateMany({
          where: {
            activity_id: id,
            year: local_date.year(),
            week_number: local_date.week(),
          },
          data: { time_to_spend_weekly },
        });
      }
    };

    await Promise.all([query1, query2]);
  }

  async startActivity(userId: number, activity_id: number, timezone: string) {
    const local_date = moment.tz(timezone);

    await this.prisma.activity_week_session.upsert({
      where: {
        activity_id_week_number_year: {
          activity_id,
          week_number: local_date.week(),
          year: local_date.year(),
        },
      },
      update: {
        session_start: new Date(),
        is_active: true,
      },
      create: {
        activity_id,
        time_to_spend_weekly: await this.getTimeToSpendWeekly(activity_id),
        session_start: new Date(),
        is_active: true,
        week_number: local_date.week(),
        year: local_date.year(),
      },
    });
  }

  async stopActivity(
    userId: number,
    activityId: number,
    timezone: string,
    time_spent_override?: number,
  ) {
    const local_date = moment.tz(timezone);

    // If activity don't exist at this moment prisma will stop at this moment
    const activity = await this.prisma.activity_week_session.findUniqueOrThrow({
      where: {
        activity_id_week_number_year: {
          activity_id: activityId,
          year: local_date.year(),
          week_number: local_date.week(),
        },
      },
      select: {
        time_spent_ms: true,
        is_active: true,
        session_start: true,
        activities: {
          select: { user_id: true },
        },
      },
    });

    if (!activity.is_active)
      throw new BadRequestException('Activity is already stopped');
    if (activity.activities.user_id !== userId)
      throw new UnauthorizedException('You are not the owner of this activity');

    const time_spent_ms =
      time_spent_override || time_spent_override === 0
        ? time_spent_override + activity.time_spent_ms
        : activity.time_spent_ms +
          Date.now() -
          activity.session_start.getTime();

    await this.prisma.activity_week_session.update({
      where: {
        activity_id_week_number_year: {
          activity_id: activityId,
          year: local_date.year(),
          week_number: local_date.week(),
        },
      },
      data: {
        session_start: null,
        is_active: false,
        time_spent_ms,
      },
    });
  }

  async cancelSession(userId: number, activityId: number) {
    await this.prisma.activity_week_session.updateMany({
      where: {
        activity_id: activityId,
        activities: { user_id: userId },
        is_active: true,
      },
      data: {
        session_start: null,
        is_active: false,
      },
    });
  }

  async deleteActivity(userId: number, activityId: number) {
    await this.prisma.activities.deleteMany({
      where: { id: activityId, user_id: userId },
    });
  }

  async getAllActivities(
    userId: number,
    timezone: string,
  ): Promise<ActivityType[]> {
    const [activities, activitiesWithNoSession] =
      await this.prisma.$transaction([
        this.prisma.activity_week_session.findMany({
          select: this.fieldsToSelect,
          where: { activities: { user_id: userId } },
        }),
        this.getActivitiesWithNoSession(userId, timezone),
      ]);

    if (activitiesWithNoSession.length === 0)
      return this.processActivities(activities);
    const createdActivities = await this.createNewActivitiesSession(
      activitiesWithNoSession,
      userId,
      timezone,
    );
    return this.processActivities(createdActivities);
  }

  async getUnfinishedActivities(userId: number, timezone: string) {
    const [activities, activitiesWithNoSession] =
      await this.prisma.$transaction([
        this.prisma.activity_week_session.findMany({
          select: this.fieldsToSelect,
          where: { activities: { user_id: userId } },
        }),
        this.getActivitiesWithNoSession(userId, timezone),
      ]);

    let processedActivities: ActivityType[];

    if (activitiesWithNoSession.length === 0) {
      processedActivities = this.processActivities(activities);
    } else {
      const createdActivities = await this.createNewActivitiesSession(
        activitiesWithNoSession,
        userId,
        timezone,
      );
      processedActivities = this.processActivities(createdActivities);
    }

    return processedActivities.filter(
      (activity) => activity.time_to_spend_weekly > activity.time_spent_ms,
    );
  }

  private processActivities(activities: object[]): ActivityType[] {
    return activities.map((activity: any) => {
      activity.name = activity.activities.name;
      activity.description = activity.activities.description;
      activity.id = activity.activities.id;
      delete activity.activities;

      return activity as ActivityType;
    });
  }

  private getActivitiesWithNoSession(userId: number, timezone: string) {
    const local_date = moment.tz(timezone);
    return this.prisma.activities.findMany({
      select: {
        id: true,
        time_to_spend_weekly: true,
      },
      where: {
        user_id: userId,
        activity_week_session: {
          none: {
            week_number: local_date.week(),
            year: local_date.year(),
          },
        },
      },
    });
  }

  private async createNewActivitiesSession(
    activitiesWithNoSession: CreateActivitySessionInterface[],
    userId: number,
    timezone: string,
  ) {
    const local_date = moment.tz(timezone);
    // TODO: There is already issue in prisma repo to add createManyAndReturn method, when it will be added, this should be changed
    const [, activities] = await this.prisma.$transaction([
      this.prisma.activity_week_session.createMany({
        data: activitiesWithNoSession.map((activity) => ({
          activity_id: activity.id,
          time_to_spend_weekly: activity.time_to_spend_weekly,
          week_number: local_date.week(),
          year: local_date.year(),
        })),
        skipDuplicates: true,
      }),
      this.prisma.activity_week_session.findMany({
        select: this.fieldsToSelect,
        where: { activities: { user_id: userId } },
      }),
    ]);
    return activities;
  }

  private async getTimeToSpendWeekly(activityId: number): Promise<number> {
    const { time_to_spend_weekly } =
      await this.prisma.activities.findUniqueOrThrow({
        where: { id: activityId },
        select: { time_to_spend_weekly: true },
      });
    return time_to_spend_weekly;
  }
}
