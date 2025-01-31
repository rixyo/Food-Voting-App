import { Test, TestingModule } from '@nestjs/testing';
import { FoodPackService } from './food-packs.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { FoodPack } from '@prisma/client';

describe('FoodPackService', () => {
  let service: FoodPackService;
  let prismaService: PrismaService;

  // Mock PrismaService methods
  const mockPrismaService = {
    foodPack: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FoodPackService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<FoodPackService>(FoodPackService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createFoodPack', () => {
    it('should create a food pack', async () => {
      const createFoodPackDto = { name: 'Special Dish', restaurantId: 1 };
      const mockFoodPack = { id: 1, ...createFoodPackDto };

      mockPrismaService.foodPack.create.mockResolvedValue(mockFoodPack);

      const result = await service.createFoodPack(
        createFoodPackDto.name,
        createFoodPackDto.restaurantId,
      );

      expect(result).toEqual(mockFoodPack);
      expect(mockPrismaService.foodPack.create).toHaveBeenCalledWith({
        data: createFoodPackDto,
      });
    });
  });

  describe('getAllFoodPacks', () => {
    it('should return all food packs', async () => {
      const mockFoodPacks = [
        { id: 1, name: 'Special Dish', restaurantId: 1 },
        { id: 2, name: 'Veg Platter', restaurantId: 2 },
      ];

      mockPrismaService.foodPack.findMany.mockResolvedValue(mockFoodPacks);

      const result = await service.getAllFoodPacks();

      expect(result).toEqual(mockFoodPacks);
      expect(mockPrismaService.foodPack.findMany).toHaveBeenCalled();
    });
  });

  describe('getFoodPackById', () => {
    it('should return a food pack by ID', async () => {
      const mockFoodPack = { id: 1, name: 'Special Dish', restaurantId: 1 };

      mockPrismaService.foodPack.findUnique.mockResolvedValue(mockFoodPack);

      const result = await service.getFoodPackById(1);

      expect(result).toEqual(mockFoodPack);
      expect(mockPrismaService.foodPack.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if food pack is not found', async () => {
      mockPrismaService.foodPack.findUnique.mockResolvedValue(null);

      const result = await service.getFoodPackById(999);

      expect(result).toBeNull();
      expect(mockPrismaService.foodPack.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  });

  describe('updateFoodPack', () => {
    it('should update a food pack', async () => {
      const updateFoodPackDto = { name: 'Updated Dish', restaurantId: 1 };
      const mockFoodPack = { id: 1, ...updateFoodPackDto };

      mockPrismaService.foodPack.update.mockResolvedValue(mockFoodPack);

      const result = await service.updateFoodPack(
        1,
        updateFoodPackDto.name,
        updateFoodPackDto.restaurantId,
      );

      expect(result).toEqual(mockFoodPack);
      expect(mockPrismaService.foodPack.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: updateFoodPackDto,
      });
    });
  });

  describe('deleteFoodPack', () => {
    it('should delete a food pack', async () => {
      const mockFoodPack = { id: 1, name: 'Special Dish', restaurantId: 1 };

      mockPrismaService.foodPack.delete.mockResolvedValue(mockFoodPack);

      const result = await service.deleteFoodPack(1);

      expect(result).toEqual(mockFoodPack);
      expect(mockPrismaService.foodPack.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
