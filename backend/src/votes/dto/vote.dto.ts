import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({
    description: 'employeeId',
    minimum: 1,
    type: String,
  })
  employeeId: string;

  @ApiProperty({
    description: 'restaurantId',
    minimum: 1,
    type: String,
  })
  restaurantId: string;
}
