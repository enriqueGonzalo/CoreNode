import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './domain/entities/price.entity';
import { Brand } from './domain/entities/brand.entity';
import { PriceRepositoryImpl } from './infrastructure/db/price.repository.impl';
import { PriceController } from './infrastructure/rest/price.controller';
import { Seeder } from './infrastructure/db/seed';
import { GetApplicablePriceService } from './application/services/get-applicable-price.service';
import { GetApplicablePriceUseCase } from './domain/usecases/get-applicable-price.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: [Price, Brand],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Price, Brand]),
  ],
  controllers: [PriceController],
  providers: [
    PriceRepositoryImpl,
    Seeder,
    GetApplicablePriceService,
    GetApplicablePriceUseCase,
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly seeder: Seeder) {}

  async onModuleInit() {
    await this.seeder.seed();
  }
}
