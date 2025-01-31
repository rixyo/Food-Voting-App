import { ApiProperty } from '@nestjs/swagger';

export class FoodPacksDto {
  @ApiProperty({
    description: 'name for food-packs',
    minimum: 1,
    type: String,
  })
  name: string;
}
