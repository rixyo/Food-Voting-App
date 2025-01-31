import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

describe('RestaurantsService', () => {
  let service: RestaurantsService;
  let prismaService: PrismaService;

  const mockRestaurant: Restaurant = {
    id: 1,
    name: 'Test Restaurant',
  };

  const prismaMock = {
    restaurant: {
      create: jest.fn().mockResolvedValue(mockRestaurant),
      findMany: jest.fn().mockResolvedValue([mockRestaurant]),
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<RestaurantsService>(RestaurantsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createRestaurant', () => {
    it('should create a new restaurant', async () => {
      const result = await service.createRestaurant('New Restaurant');
      expect(prismaService.restaurant.create).toHaveBeenCalledWith({
        data: { name: 'New Restaurant' },
      });
      expect(result).toEqual(mockRestaurant);
    });
  });

  describe('getRestaurants', () => {
    it('should return all restaurants', async () => {
      const result = await service.getRestaurants();
      expect(prismaService.restaurant.findMany).toHaveBeenCalled();
      expect(result).toEqual([mockRestaurant]);
    });
  });

  describe('getRestaurant', () => {
    it('should return a restaurant if found', async () => {
      (prismaService.restaurant.findUnique as jest.Mock).mockResolvedValueOnce(
        mockRestaurant,
      );

      const result = await service.getRestaurant(1);
      expect(prismaService.restaurant.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(mockRestaurant);
    });

    it('should throw an error if the restaurant is not found', async () => {
      (prismaService.restaurant.findUnique as jest.Mock).mockResolvedValueOnce(
        null,
      );

      await expect(service.getRestaurant(2)).rejects.toThrowError(
        'Restaurant not found with id 2',
      );
      expect(prismaService.restaurant.findUnique).toHaveBeenCalledWith({
        where: { id: 2 },
      });
    });
  });
});
