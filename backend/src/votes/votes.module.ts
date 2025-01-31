import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';

@Module({
  imports: [PrismaModule],
  controllers: [VotesController],
  providers: [VotesService],
})
export class VotesModule {}
