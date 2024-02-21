import { Test, TestingModule } from '@nestjs/testing';
import { Todos } from './todos';

describe('Todos', () => {
  let provider: Todos;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Todos],
    }).compile();

    provider = module.get<Todos>(Todos);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
