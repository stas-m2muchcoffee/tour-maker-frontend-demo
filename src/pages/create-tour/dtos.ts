import { ArrayMinSize, IsArray, IsUUID } from "class-validator";

import { IsNotEmpty } from "class-validator";

export class CreateTourDto {
  @IsNotEmpty()
  @IsUUID()
  cityId!: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @IsUUID(4, { each: true })
  categoryIds!: string[];
}
