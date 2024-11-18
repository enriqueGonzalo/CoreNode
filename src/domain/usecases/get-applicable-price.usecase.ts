import { PriceRepository } from '../repositories/price.repository';
import { Price } from '../entities/price.entity';

export class GetApplicablePriceUseCase {
  constructor(private readonly priceRepository: PriceRepository) {}

  async execute(
    productId: number,
    brandId: number,
    applicationDate: Date,
  ): Promise<Price | null> {
    return this.priceRepository.findApplicablePrice(
      productId,
      brandId,
      applicationDate,
    );
  }
}
