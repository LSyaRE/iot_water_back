import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import {
  isEmailMessage,
  isEmptyMessage,
  isStringMessage,
  minLengthMessage,
} from '@shared/utils';
import { ApiProperty } from '@nestjs/swagger';

// PROPERTIES CONSTANTS
const USERNAME_PROPERTY = 'username';
const EMAIL_PROPERTY = 'email';
const PASSWORD_PROPERTY = 'password';
const PASSWORD_LENGTH_PROPERTY = 5;

export class AuthDto {
  @ApiProperty({
    nullable: false,
    description: 'Usuario que permitirá el acceso a la API',
  })
  @IsNotEmpty({ message: isEmptyMessage(USERNAME_PROPERTY) })
  username: string;

  @ApiProperty({
    nullable: false,
    description: 'Correo Electronico para verificar que sea un correo valido',
  })
  @IsNotEmpty({ message: isEmptyMessage(EMAIL_PROPERTY) })
  @IsEmail({}, { message: isEmailMessage() })
  @IsString({ message: isStringMessage(EMAIL_PROPERTY) })
  email: string;

  @ApiProperty({
    nullable: false,
    description: 'Contraseña del usuario que permitirá el acceso a la API',
  })
  @IsNotEmpty({ message: isEmptyMessage(PASSWORD_PROPERTY) })
  @IsString({ message: isStringMessage(PASSWORD_PROPERTY) })
  @MinLength(PASSWORD_LENGTH_PROPERTY, {
    message: minLengthMessage(PASSWORD_PROPERTY, PASSWORD_LENGTH_PROPERTY),
  })
  password: string;
}

export class LoginDto {
  @ApiProperty({
    nullable: false,
    description: 'Usuario que permitirá el acceso a la API',
  })
  @IsNotEmpty({ message: isEmptyMessage(USERNAME_PROPERTY) })
  username: string;

  @ApiProperty({
    nullable: false,
    description: 'Contraseña del usuario que permitirá el acceso a la API',
  })
  @IsNotEmpty({ message: isEmptyMessage(PASSWORD_PROPERTY) })
  @IsString({ message: isStringMessage(PASSWORD_PROPERTY) })
  @MinLength(PASSWORD_LENGTH_PROPERTY, {
    message: minLengthMessage(PASSWORD_PROPERTY, PASSWORD_LENGTH_PROPERTY),
  })
  password: string;
}
