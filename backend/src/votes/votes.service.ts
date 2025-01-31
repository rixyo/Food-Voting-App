import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VotesService {
  constructor(private prisma: PrismaService) {}

  async vote(employeeId: number, restaurantId: number) {
    try {
      
      return this.prisma.vote.create({
        data: { employeeId, restaurantId },
      });
    } catch (error:any) {
      throw new Error('Your vote is not counted.')
      
    }
  }

  async getDailyWinner() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const votes = await this.prisma.vote.groupBy({
      by: ['restaurantId'],
      where: { createdAt: { gte: today } },
      _count: { restaurantId: true },
      orderBy: { _count: { restaurantId: 'desc' } },
      take: 1,
    });

    if (votes.length > 0) {
      return this.prisma.restaurant.findUnique({
        where: { id: votes[0].restaurantId },
      });
    }
    return null;
  }
}
