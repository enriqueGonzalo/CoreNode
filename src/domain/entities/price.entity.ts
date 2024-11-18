import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Brand } from './brand.entity';

@Entity('prices')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Brand)
  @JoinColumn({ name: 'brandId' })
  brand: Brand;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column()
  priceList: number;

  @Column()
  productId: number;

  @Column()
  priority: number;

  @Column()
  price: number;

  @Column()
  currency: string;
}
