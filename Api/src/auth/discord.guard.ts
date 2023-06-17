import {
  applyDecorators,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  forwardRef,
  Inject,
  Injectable,
  SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { GuildStatService } from '../guild-stat/guild-stat.service';

export enum RoleEnum {
  Public = 'public',
  User = 'user',
}

export const ROLES_KEY = 'roles';

export const AuthorizationToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return (
      request?.headers?.authorization ?? request?.cookies?.accessToken ?? null
    );
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
  constructor(
    private reflector: Reflector,
    @Inject(forwardRef(() => GuildStatService))
    private guildStatService: GuildStatService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get required roles
    const requiredRoles: RoleEnum[] = //
      this.reflector.getAllAndOverride<RoleEnum[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);

    // Check if route was public
    if (requiredRoles && requiredRoles.includes(RoleEnum.Public)) {
      return true;
    }

    // Get request
    let request = context.switchToHttp().getRequest();
    // Initialize guildId
    let guildId: string | null = null;

    // Check if no request was found
    if (!request) {
      // Get context from graphql
      const ctx = GqlExecutionContext.create(context);
      // Get request from context
      request = ctx.getContext().req;

      // Get graphql args
      const args = ctx.getArgs();
      // Set guildId
      guildId = args.id ?? args.guildId ?? null;
    }

    // Get token from request
    const token = this.getTokenFromRequest(request);
    // Check if token is valid and exists.
    if (!token) return false;

    // Fetch the user to discord, getting the user, and validating the token.
    const tokenResponseData = await fetch('https://discord.com/api/users/@me', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    // Check if guildId is set
    if (guildId !== null) {
      // Get staff members
      const staffMemberIdsStr = await this.guildStatService.findOne(
        guildId,
        'staffMembersIds',
        -1,
      );
      // Split ids into a list.
      const staffMemberIds = staffMemberIdsStr?.value?.split(',') ?? [];
      // Check if staff members is empty
      if (staffMemberIds.length < 1) return false;

      // Get token response data
      const tokenResponseDataJson = await tokenResponseData.json();
      // Check if staffMemberIds includes the user id
      const isStaffMember = staffMemberIds.includes(tokenResponseDataJson.id);
      // Check if user is not a staff member
      if (!isStaffMember) return false;
    }

    // Check if the response status is 200
    return tokenResponseData.status === 200;
  }

  private getTokenFromRequest(request: Request): string | null {
    return (
      request?.headers?.authorization ?? request?.cookies?.accessToken ?? null
    );
  }
}
