import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Role } from '../schema/user.schema';

export class GetReceptionistsDto {
  @IsEnum(Role, {
    message: `role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;

  @IsString()
  doctorId: string;

  @IsString()
  clinicId: string;
}
