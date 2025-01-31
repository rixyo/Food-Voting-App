import "module";import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/prisma/prisma.module';
import { FoodPackController } from "./food-packs.controller";
import { FoodPackService } from "./food-packs.service";



@Module({
    imports:[PrismaModule],
    controllers:[FoodPackController],
    providers:[FoodPackService]
})

export class FoodPacksModule{}