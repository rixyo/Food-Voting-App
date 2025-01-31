import { Controller, Post, Body, Get } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VoteDto } from './dto/vote.dto';

@Controller('api/votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('vote')
  vote(
    @Body() data:VoteDto
  ) {
    return this.votesService.vote(parseInt(data.employeeId), parseInt(data.restaurantId));
  }

  @Get('winner')
  getDailyWinner() {
    return this.votesService.getDailyWinner();
  }
}
