import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { toLower, replace, trim } from "lodash";

export class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  @Transform(({ value }: { value: string }) =>
    toLower(replace(trim(value), /\s+/g, ""))
  )
  email!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password!: string;
}
