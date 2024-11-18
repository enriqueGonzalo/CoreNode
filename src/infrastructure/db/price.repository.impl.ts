import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from '@domain/entities/price.entity';
import { PriceRepository } from '@domain/repositories/price.repository';

@Injectable()
export class PriceRepositoryImpl implements PriceRepository {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  async findApplicablePrice(
    productId: number,
    brandId: number,
    applicationDate: Date,
  ): Promise<Price | null> {
    return this.priceRepository
      .createQueryBuilder('price')
      .where('price.productId = :productId', { productId })
      .andWhere('price.brandId = :brandId', { brandId })
      .andWhere('price.startDate <= :applicationDate', { applicationDate })
      .andWhere('price.endDate >= :applicationDate', { applicationDate })
      .orderBy('price.priority', 'DESC')
      .getOne();
  }
}
