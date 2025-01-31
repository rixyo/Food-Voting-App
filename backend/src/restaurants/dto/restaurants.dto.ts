import { ApiProperty } from '@nestjs/swagger';

export class RestaurantDto {
    @ApiProperty({
        description:'name for restaurant',
        minimum:1,
        type: String,
    })
  name: string;
}
