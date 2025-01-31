import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { FoodPackService } from './food-packs.service';
import { FoodPack } from '@prisma/client';
import { FoodPacksDto } from './dto/food-packs.dto';

@Controller('api/food-packs')
export class FoodPackController {
  constructor(private readonly foodPackService: FoodPackService) {}

  // Create a food pack
  @Post('restaurants/:restaurantId')
  async createFoodPack(
    @Body() data: FoodPacksDto,
    @Param('restaurantId') restaurantId: string,
  ): Promise<FoodPack> {
    return this.foodPackService.createFoodPack(data.name, parseInt(restaurantId));
  }

  // Get all food packs
  @Get()
  async getAllFoodPacks(): Promise<FoodPack[]> {
    return this.foodPackService.getAllFoodPacks();
  }

  // Get a single food pack by ID
  @Get(':id')
  async getFoodPackById(@Param('id') id: number): Promise<FoodPack | null> {
    return this.foodPackService.getFoodPackById(id);
  }

  // Update a food pack
  @Patch(':id/restaurants/:restaurantId')
  async updateFoodPack(
    @Param('id') id: number,
    @Param('restaurantId') restaurantId: number,
    @Body() data: FoodPacksDto,
  ): Promise<FoodPack> {
    return this.foodPackService.updateFoodPack(id, data.name, restaurantId);
  }

  // Delete a food pack
  @Delete(':id')
  async deleteFoodPack(@Param('id') id: number): Promise<FoodPack> {
    return this.foodPackService.deleteFoodPack(id);
  }
}
