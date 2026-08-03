import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserDto } from 'src/dtos/user.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
    ) {}

    async register(data: UserDto) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await this.userService.createUser({
        ...data,
        password: hashedPassword,
        });
        return this.sign({ userId: user.user_id, email: user.email });
    }

    async login(input: { email: string; password: string }) {
        const user = await this.userService.getUserByEmail(input.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const passwordMatch = await bcrypt.compare(input.password, user.password);
        if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

        return this.sign({ userId: user.user_id, email: user.email });
    }

    async sign(user: { userId: number; email: string }) {
        const accessToken = await this.jwtService.signAsync({
        user_id: user.userId,
        email: user.email,
        });
        return { accessToken, userId: user.userId, email: user.email };
    }

    async logout(res:Response){
        res.clearCookie('jwt', {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/',
        })
        return { message: 'Logout exitoso' };
    }


}