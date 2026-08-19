import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guards';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [UsersModule,
    JwtModule.registerAsync({
          useFactory: () => ({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '7d' },
          }),
        }),
  ],
  exports: [AuthGuard,JwtModule]

})
export class AuthModule {}
