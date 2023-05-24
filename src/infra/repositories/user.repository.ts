import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';
import { UserRepository } from 'src/domain/repositories/user-repository.interface';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(data: Prisma.UserCreateInput): Promise<void> {
    await this.prismaService.user.create({ data });
  }
}
