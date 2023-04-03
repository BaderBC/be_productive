import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('jwt'))
  @Get()
  getHello(@Req() req: any) {
    console.log(req.user);
    return 'This is just API, please open REAL page';
  }
}
