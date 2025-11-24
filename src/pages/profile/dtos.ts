import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserPreferencesDto {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  preferences!: string[];
}
