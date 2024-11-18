import { Injectable } from '@nestjs/common';
import { GetApplicablePriceUseCase } from '../../domain/usecases/get-applicable-price.usecase';
import { Price } from '../../domain/entities/price.entity';

@Injectable()
export class GetApplicablePriceService {
  constructor(private readonly useCase: GetApplicablePriceUseCase) {}

  async getPrice(
    productId: number,
    brandId: number,
    applicationDate: Date,
  ): Promise<Price | null> {
    return this.useCase.execute(productId, brandId, applicationDate);
  }
}
