import { Transform } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from "class-validator";
import { toLower, replace, trim } from "lodash";

export class SignUpDto {
  @IsEmail()
  @Transform(({ value }: { value: string }) =>
    toLower(replace(trim(value), /\s+/g, ""))
  )
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  preferences: string[] = [];
}
