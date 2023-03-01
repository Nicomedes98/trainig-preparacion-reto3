import { IsString, IsOptional, MaxLength, MinLength, IsEmail } from 'class-validator';

export class UsersDto {
    @IsString()
    @MinLength(2)
    uuid: string;
    @IsString()
    @MinLength(2, {
        message:'No se permite un nombre corto, menor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(20, {
        message:'No se permite un nombre mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    name: string;
    @IsString()
    @IsOptional()
    @MinLength(2, {
        message:'No se permite un Apellido corto, menor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    @MaxLength(20, {
        message:'No se permite un Apellido mayor a $constraint1 caracteres, el valor actual es $value por favor selecciona uno válido'
    })
    lastName?: string;
    @IsEmail()
    email: string;
  }