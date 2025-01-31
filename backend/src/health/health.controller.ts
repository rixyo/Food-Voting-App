import { Controller, Get } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('api/health')
export class HealthController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  getHello(): Promise<void> {
    return this.prismaService.onModuleInit()
  }
}
