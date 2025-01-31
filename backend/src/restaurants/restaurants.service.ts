import { Injectable } from '@nestjs/common';
import { Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()

export class RestaurantsService {
    constructor(private readonly prismaService: PrismaService){}

    async createRestaurant(name:string): Promise<Restaurant> {
        try {
            
            return await this.prismaService.restaurant.create({
                data:{
                    name
                }
            })
        } catch (error:any) {
            throw new Error('Restaurant creation failed')
            
        }
    }

    async getRestaurants():Promise<Restaurant[]> {
        return this.prismaService.restaurant.findMany({
          include: { foodPacks: true },
        });
    }

    async getRestaurant(id:Restaurant['id']) :Promise<Restaurant> {
        const restaurant = await this.prismaService.restaurant.findUnique({
            where:{
                id
            }
        })
        if(!restaurant){
            throw new Error('Restaurant not found with id '+id)
        }

        return restaurant
    }

}