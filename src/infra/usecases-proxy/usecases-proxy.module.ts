import { DynamicModule, Module } from '@nestjs/common';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { SignUpUseCases } from 'src/usecases/auth/sign-up.usecases';
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { SignInUseCases } from 'src/usecases/auth/sign-in.usecases';
import { ExceptionsService } from '../exceptions/exceptions.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { JwtTokenModule } from '../services/jwt/jwt.module';

@Module({
  imports: [RepositoriesModule, BcryptModule, ExceptionsModule, JwtTokenModule],
})
export class UseCasesProxyModule {
  // Auth
  static SIGN_UP_USECASES_PROXY = 'SignUpUsecasesProxy';
  static SIGN_IN_USECASES_PROXY = 'SignInUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UseCasesProxyModule,
      providers: [
        {
          inject: [DatabaseUserRepository, BcryptService],
          provide: UseCasesProxyModule.SIGN_UP_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcrypt: BcryptService,
          ) => new UseCaseProxy(new SignUpUseCases(userRepo, bcrypt)),
        },
        {
          inject: [
            DatabaseUserRepository,
            BcryptService,
            ExceptionsService,
            JwtTokenService,
          ],
          provide: UseCasesProxyModule.SIGN_IN_USECASES_PROXY,
          useFactory: (
            userRepo: DatabaseUserRepository,
            bcrypt: BcryptService,
            exceptions: ExceptionsService,
            jwt: JwtTokenService,
          ) =>
            new UseCaseProxy(
              new SignInUseCases(userRepo, bcrypt, exceptions, jwt),
            ),
        },
      ],
      exports: [
        UseCasesProxyModule.SIGN_UP_USECASES_PROXY,
        UseCasesProxyModule.SIGN_IN_USECASES_PROXY,
      ],
    };
  }
}
