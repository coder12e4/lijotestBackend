import { Body, Controller, Get, Post,Patch,Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';


@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post()
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body);
  };

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllUsers() {
    return this.userService.findAll();
  };

  @Get()
  getAll() {
    return this.userService.findAll();
  };

  @Post('login')
  login(@Body() body: LoginUserDto) {
    return this.userService.login(body);
  };

@Get("employees")
findEmployees() {
  return this.userService.findEmployees();
}


@Patch(":id/status")
toggleStatus(@Param("id") id: string) {
  return this.userService.toggleStatus(id);
}



  

}
