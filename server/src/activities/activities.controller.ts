import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { AddActivityDto } from './dto/addActivity.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetJwt } from '../auth/decorator/getJwt.decorator';
import { JwtDto } from '../auth/dto/jwt.dto';
import { PatchActivityDto } from './dto/patchActivity.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('activities')
export class ActivitiesController {
  constructor(private activitiesService: ActivitiesService) {}

  @Post()
  async addActivity(
    @Body() addActivityDto: AddActivityDto,
    @GetJwt() jwt: JwtDto,
  ) {
    await this.activitiesService.addActivity(addActivityDto, jwt.userId);
  }

  @Patch()
  async updateActivityInfo(
    @Body() patchActivityDto: PatchActivityDto,
    @GetJwt() jwt: JwtDto,
  ) {
    await this.activitiesService.updateActivityInfo(
      patchActivityDto,
      jwt.userId,
      jwt.timezone,
    );
  }

  @Post('start')
  async startActivity(
    @GetJwt() jwt: JwtDto,
    @Body('activityId') activityId: number,
  ) {
    if (!activityId) throw new BadRequestException('No activityId provided');
    await this.activitiesService.startActivity(
      jwt.userId,
      activityId,
      jwt.timezone,
    );
  }

  @Post('stop')
  async stopActivity(
    @GetJwt() jwt: JwtDto,
    @Body('activityId') activityId: number,
  ) {
    if (!activityId) throw new BadRequestException('No activityId provided');
    await this.activitiesService.stopActivity(
      jwt.userId,
      activityId,
      jwt.timezone,
    );
  }

  @Post('stop_specific_time')
  async stopActivitySpecificTime(
    @GetJwt() jwt: JwtDto,
    @Body('activityId') activityId: number,
    @Body('time') time: number,
  ) {
    if (!activityId || time === undefined)
      throw new BadRequestException('No activityId or time provided');
    await this.activitiesService.stopActivity(
      jwt.userId,
      activityId,
      jwt.timezone,
      time,
    );
  }

  @Delete('session')
  async cancelSession(
    @GetJwt() jwt: JwtDto,
    @Body('activityId') activityId: number,
  ) {
    if (!activityId) throw new BadRequestException('No activityId provided');
    await this.activitiesService.cancelSession(jwt.userId, activityId);
  }

  @Delete()
  async deleteActivity(
    @GetJwt() jwt: JwtDto,
    @Body('activityId') activityId: number,
  ) {
    if (!activityId) throw new BadRequestException('No activityId provided');
    await this.activitiesService.deleteActivity(jwt.userId, activityId);
  }
}
