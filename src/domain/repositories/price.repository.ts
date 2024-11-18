import { Price } from '../entities/price.entity';

export interface PriceRepository {
  findApplicablePrice(
    productId: number,
    brandId: number,
    applicationDate: Date,
  ): Promise<Price | null>;
}