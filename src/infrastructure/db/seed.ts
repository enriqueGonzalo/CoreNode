import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Brand } from '@domain/entities/brand.entity';
import { Price } from '@domain/entities/price.entity';

@Injectable()
export class Seeder {
  constructor(
    @InjectRepository(Brand) private brandRepository: Repository<Brand>,
    @InjectRepository(Price) private priceRepository: Repository<Price>,
  ) {}

  async seed() {
    const existingBrands = await this.brandRepository.count();
    if (existingBrands > 0) return;
    const brand = await this.brandRepository.save({ id: 1, name: 'ZARA' });
    await this.priceRepository.save([
      {
        brand,
        startDate: new Date('2020-06-14T00:00:00'),
        endDate: new Date('2020-12-31T23:59:59'),
        priceList: 1,
        productId: 35455,
        priority: 0,
        price: 35.5,
        currency: 'EUR',
      },
      {
        brand,
        startDate: new Date('2020-06-14T15:00:00'),
        endDate: new Date('2020-06-14T18:30:00'),
        priceList: 2,
        productId: 35455,
        priority: 1,
        price: 25.45,
        currency: 'EUR',
      },
      {
        brand,
        startDate: new Date('2020-06-15T00:00:00'),
        endDate: new Date('2020-06-15T11:00:00'),
        priceList: 3,
        productId: 35455,
        priority: 1,
        price: 30.5,
        currency: 'EUR',
      },
      {
        brand,
        startDate: new Date('2020-06-15T16:00:00'),
        endDate: new Date('2020-12-31T23:59:59'),
        priceList: 4,
        productId: 35455,
        priority: 1,
        price: 38.95,
        currency: 'EUR',
      },
    ]);

    console.log('✅ Database seeded successfully');
  }
}
