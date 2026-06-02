import { Test, TestingModule } from '@nestjs/testing';
import { PrismaPlayerRepository } from './players.service';

describe('PlayersService', () => {
  let service: PrismaPlayerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaPlayerRepository],
    }).compile();

    service = module.get<PrismaPlayerRepository>(PrismaPlayerRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
