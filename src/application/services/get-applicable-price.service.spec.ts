import { Test, TestingModule } from '@nestjs/testing';
import { GetApplicablePriceService } from './get-applicable-price.service';
import { GetApplicablePriceUseCase } from '../../domain/usecases/get-applicable-price.usecase';
import { Price } from '../../domain/entities/price.entity';

describe('GetApplicablePriceService', () => {
  let service: GetApplicablePriceService;
  let useCase: GetApplicablePriceUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetApplicablePriceService,
        {
          provide: GetApplicablePriceUseCase,
          useValue: {
            execute: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<GetApplicablePriceService>(GetApplicablePriceService);
    useCase = module.get<GetApplicablePriceUseCase>(GetApplicablePriceUseCase);
  });

  it('returns the applicable price for valid inputs', async () => {
    const price: Price = { id: 1 } as Price;
    jest.spyOn(useCase, 'execute').mockResolvedValue(price);

    const result = await service.getPrice(1, 1, new Date());

    expect(result).toEqual(price);
  });

  it('returns null if no applicable price is found', async () => {
    jest.spyOn(useCase, 'execute').mockResolvedValue(null);

    const result = await service.getPrice(1, 1, new Date());

    expect(result).toBeNull();
  });

  it('throws an error if useCase execution fails', async () => {
    jest
      .spyOn(useCase, 'execute')
      .mockRejectedValue(new Error('Execution failed'));

    await expect(service.getPrice(1, 1, new Date())).rejects.toThrow(
      'Execution failed',
    );
  });
});
