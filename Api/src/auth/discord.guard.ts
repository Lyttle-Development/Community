import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';

export enum RoleEnum {
  Public = 'public',
  User = 'user',
  Moderator = 'moderator',
  Admin = 'admin',
}

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES_KEY, roles);

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () =>
  applyDecorators(
    SetMetadata(IS_PUBLIC_KEY, true),
    SetMetadata(ROLES_KEY, RoleEnum.Public),
  );

@Injectable()
export class DiscordGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (requiredRoles && requiredRoles.includes(RoleEnum.Public)) {
      return true;
    }

    let request = context.switchToHttp().getRequest();

    if (!request) {
      const ctx = GqlExecutionContext.create(context);
      request = ctx.getContext().req;
    }
    const token = this.extractTokenFromHeader(request);

    if (!token) return false;

    const tokenResponseData = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    const valid = tokenResponseData.status === 200;
    return valid;
  }

  private extractTokenFromHeader(request: Request): string | null {
    return (
      request?.headers?.authorization ?? request?.cookies?.accessToken ?? null
    );
  }
}