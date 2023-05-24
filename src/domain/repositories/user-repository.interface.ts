import { Prisma } from '@prisma/client';

export interface UserRepository {
  signUp(data: Prisma.UserCreateInput): Promise<void>;
}
