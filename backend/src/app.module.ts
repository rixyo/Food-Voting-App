import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { VotesModule } from './votes/votes.module';
import { FoodPacksModule } from './food-packs/food-packs.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    RestaurantsModule,
    VotesModule,
    FoodPacksModule,
    HealthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
