import { RedisModule } from '@liaoliaots/nestjs-redis';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RedisModule.forRoot({
      config: {
        host: '127.0.0.1',
        port: 6379,
        password: 'guest',
      },
    }),
  ],
})
export class RedisCacheModule {}
