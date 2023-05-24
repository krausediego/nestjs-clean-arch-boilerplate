import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { SignUpUseCases } from 'src/usecases/auth/sign-up.usecases';

@Module({ imports: [RepositoriesModule] })
export class UseCasesProxyModule {
  // Auth
  static SIGN_UP_USECASES_PROXY = 'SignUpUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository],
          provide: UseCasesProxyModule.SIGN_UP_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) =>
            new UseCaseProxy(new SignUpUseCases(userRepo)),
        },
      ],
      exports: [UseCasesProxyModule.SIGN_UP_USECASES_PROXY],
    };
  }
}
