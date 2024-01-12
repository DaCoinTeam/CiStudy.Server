import { Module } from '@nestjs/common';
import UserResolvers from './auth.resolvers';

import { JwtStrategy } from '../shared';
import { UserMySqlModule } from '@database';

@Module({
  imports: [UserMySqlModule],
  providers: [
    UserResolvers,
    //strategies
    JwtStrategy,
  ],
})
export default class AuthGraphQLModule {}
