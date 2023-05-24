import { Module } from '@nestjs/common';
import { UseCasesProxyModule } from './infra/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from './infra/controllers/controllers.module';
import { BcryptModule } from './infra/services/bcrypt/bcrypt.module';

@Module({
  imports: [UseCasesProxyModule.register(), ControllersModule, BcryptModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
