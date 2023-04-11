import { Injectable } from '@nestjs/common';
import { PrismaService } from '../db/prisma/prisma.service';
import { AddActivityDto } from './dto/addActivity.dto';
import { PatchActivityDto } from './dto/patchActivity.dto';
import { ActivityType } from './dto/activity.type';

@Injectable()
export class ActivitiesService {
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

  async updateActivityInfo(patchActivityDto: PatchActivityDto, userId: number) {
    const id = patchActivityDto.activityId;
    delete patchActivityDto.activityId;
    await this.prisma.activities.updateMany({
      where: { id, user_id: userId },
      data: patchActivityDto,
    });
  }

  async startActivity(userId: number, activityId: number) {
    await this.prisma.activities.updateMany({
      where: { id: activityId, user_id: userId, is_active: false },
      data: { session_start: Date.now(), is_active: true },
    });
  }

  async stopActivity(userId: number, activityId: number) {
    const activity = await this.prisma.activities.findUniqueOrThrow({
      where: { id: activityId },
    });
    await this.prisma.activities.updateMany({
      where: { id: activityId, user_id: userId, is_active: true },
      data: {
        session_start: null,
        is_active: false,
        time_spent_ms: Number(
          BigInt(activity.time_spent_ms) +
            BigInt(Date.now()) -
            activity.session_start,
        ),
      },
    });
  }

  async stopActivitySpecificTime(
    userId: number,
    activityId: number,
    time: number,
  ) {
    const activity = await this.prisma.activities.findUniqueOrThrow({
      where: { id: activityId },
    });
    await this.prisma.activities.updateMany({
      where: { id: activityId, user_id: userId, is_active: true },
      data: {
        session_start: null,
        is_active: false,
        time_spent_ms: activity.time_spent_ms + time,
      },
    });
  }

  async cancelSession(userId: number, activityId: number) {
    await this.prisma.activities.updateMany({
      where: { id: activityId, user_id: userId, is_active: true },
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

  private fieldsToSelect = {
    id: true,
    name: true,
    description: true,
    time_to_spend_weekly: true,
    user_id: true,
    time_spent_ms: true,
    session_start: true,
    is_active: true,
  };

  private processActivity(activity: any): ActivityType {
    return {
      ...activity,
      session_start: Number(activity.session_start),
      time_spent_ms:
        Number(activity.session_start) - Date.now() + activity.time_spent_ms,
    };
  }

  async getAllActivities(userId: number): Promise<ActivityType[]> {
    const activities = await this.prisma.activities.findMany({
      select: this.fieldsToSelect,
      where: { user_id: userId },
    });
    return activities.map(this.processActivity);
  }

  async getUnfinishedActivities(userId: number) {
    const activities = await this.prisma.activities.findMany({
      select: this.fieldsToSelect,
      where: { user_id: userId },
    });
    return activities
      .map(this.processActivity)
      .filter(
        (activity) => activity.time_to_spend_weekly > activity.time_spent_ms,
      );
  }
}
