import { Controller, Get, Query } from '@nestjs/common';
import { GetApplicablePriceService } from '../../application/services/get-applicable-price.service';

@Controller('prices')
export class PriceController {
  constructor(private readonly service: GetApplicablePriceService) {}

  @Get()
  async getApplicablePrice(
    @Query('productId') productId: number,
    @Query('brandId') brandId: number,
    @Query('applicationDate') applicationDate: string,
  ) {
    const date = new Date(applicationDate);
    const price = await this.service.getPrice(productId, brandId, date);
    if (!price) return { message: 'No price found' };
    return price;
  }
}
