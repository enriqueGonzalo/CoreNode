import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prices')
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  brandId: number;

  @Column()
  productId: number;

  @Column()
  priceList: number;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  priority: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  currency: string;
}
