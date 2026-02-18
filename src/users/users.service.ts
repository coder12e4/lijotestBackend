import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UserRole } from "../common/enums/user-role.enum";


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private authService: AuthService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.userRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      role: createUserDto.role,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  async findAll() {
    return this.userRepo.find();
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.userRepo.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isMatch = await bcrypt.compare(
      loginDto.password.toString(),
      user.password.toString(),
    );

    if (!isMatch) {
      throw new UnauthorizedException('invalid credentials');
    }
    const token = this.authService.generateToken(user);

    return {
      message: 'login sucess',
      access_token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }


async findEmployees() {
  return this.userRepo.find({
    where: {
      role: UserRole.EMPLOYEE,
    },
    order: {
      created_at: "DESC",
    },
  });
}

async toggleStatus(id: string) {

  const user = await this.userRepo.findOne({
    where: { id },
  });

  if (!user) throw new Error("User not found");

  user.isActive = !user.isActive;

  return this.userRepo.save(user);
}

  
}
