import { Module } from '@nestjs/common';
import { UsersModule } from './Users/user.module';

@Module({
  modules: [UsersModule]
})
export class ApplicationModule {}
