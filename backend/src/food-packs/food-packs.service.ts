import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodPack } from '@prisma/client';

@Injectable()
export class FoodPackService {
  constructor(private prisma: PrismaService) {}

  // Create a food pack
  async createFoodPack(name: string, restaurantId: number): Promise<FoodPack> {
    try {
      return this.prisma.foodPack.create({
        data: {
          name,
          restaurantId,
        },
      });
      
    } catch (error:any) {
      throw new Error('Food package creation failed')
      
    }
  }

  // Get all food packs
  async getAllFoodPacks(): Promise<FoodPack[]> {
    return this.prisma.foodPack.findMany();
  }

  // Get a single food pack by ID
  async getFoodPackById(id: number): Promise<FoodPack | null> {
    return this.prisma.foodPack.findUnique({
      where: { id },
    });
  }

  // Update a food pack by ID
  async updateFoodPack(
    id: number,
    name: string,
    restaurantId: number,
  ): Promise<FoodPack> {
    return this.prisma.foodPack.update({
      where: { id },
      data: {
        name,
        restaurantId,
      },
    });
  }

  // Delete a food pack by ID
  async deleteFoodPack(id: number): Promise<FoodPack> {
    return this.prisma.foodPack.delete({
      where: { id },
    });
  }
}
