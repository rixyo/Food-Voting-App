import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from '@prisma/client';
import { RestaurantDto } from './dto/restaurants.dto';

@Controller('api/restaurants')

export class RestaurantsController {
    constructor(private readonly restaurantService: RestaurantsService ) {}

    @Get()
    getRestaurants():Promise<Restaurant[]> {
        return  this.restaurantService.getRestaurants()
    }
    @Get(':id')
    getRestaurant(
     @Param('id') id:number
    ): Promise<Restaurant> {
        return this.restaurantService.getRestaurant(id)
    }

    @Post()
    addRestaurant(
        @Body() data:RestaurantDto 
    ) : Promise<Restaurant> {
        if(typeof data.name ==='undefined' || data.name.trim()===''){
            throw new Error('Name is required')
        }
        return this.restaurantService.createRestaurant(data.name)
    }

    
}
