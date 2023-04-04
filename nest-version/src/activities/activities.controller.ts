import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { AddActivityDto } from './dto/addActivity.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetJwt } from '../auth/decorator/getJwt.decorator';
import { JwtDto } from '../auth/dto/jwt.dto';

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
}
