import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from 'src/auth/decorators/Role.decorator';
import { Role } from 'src/schema/user.schema';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor (private reflector:Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const requiredRoles=this.reflector.getAllAndOverride<Role[]>(ROLES_KEY,[context.getHandler(),context.getClass()  ]);
    const User=context.switchToHttp().getRequest().user
    const hasRequiredRoles=requiredRoles.some(role=>User.role===role)
    return hasRequiredRoles;
  }
}
