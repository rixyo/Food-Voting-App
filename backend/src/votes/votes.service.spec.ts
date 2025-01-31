import { Test, TestingModule } from '@nestjs/testing';
import { VotesService } from './votes.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('VotesService', () => {
  let service: VotesService;
  let prismaService: PrismaService;

  // Mock PrismaService methods
  const mockPrismaService = {
    vote: {
      create: jest.fn(),
      groupBy: jest.fn(),
    },
    restaurant: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VotesService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<VotesService>(VotesService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('vote', () => {
    it('should create a vote record', async () => {
      // Arrange
      const employeeId = 1;
      const restaurantId = 2;
      mockPrismaService.vote.create.mockResolvedValue({
        employeeId,
        restaurantId,
      });

      // Act
      const result = await service.vote(employeeId, restaurantId);

      // Assert
      expect(result).toEqual({ employeeId, restaurantId });
      expect(mockPrismaService.vote.create).toHaveBeenCalledWith({
        data: { employeeId, restaurantId },
      });
    });
  });

  describe('getDailyWinner', () => {
    it('should return the restaurant with the most votes for today', async () => {
      // Arrange
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const mockVotes = [
        {
          restaurantId: 1,
          _count: { restaurantId: 5 }, // Restaurant 1 has 5 votes
        },
      ];
      const mockRestaurant = { id: 1, name: 'Restaurant 1' };
      mockPrismaService.vote.groupBy.mockResolvedValue(mockVotes);
      mockPrismaService.restaurant.findUnique.mockResolvedValue(mockRestaurant);

      // Act
      const result = await service.getDailyWinner();

      // Assert
      expect(result).toEqual(mockRestaurant);
      expect(mockPrismaService.vote.groupBy).toHaveBeenCalledWith({
        by: ['restaurantId'],
        where: { createdAt: { gte: today } },
        _count: { restaurantId: true },
        orderBy: { _count: { restaurantId: 'desc' } },
        take: 1,
      });
      expect(mockPrismaService.restaurant.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if no votes are cast today', async () => {
      // Arrange
      const mockVotes = [];
      mockPrismaService.vote.groupBy.mockResolvedValue(mockVotes);

      // Act
      const result = await service.getDailyWinner();

      // Assert
      expect(result).toBeNull();
      expect(mockPrismaService.vote.groupBy).toHaveBeenCalled();
    });
  });
});
