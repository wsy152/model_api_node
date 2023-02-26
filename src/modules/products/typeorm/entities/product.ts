import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('increment')
  id:string;

  @Column()
  name:string;

  @Column('decimal')
  price:number;

  @Column('int')
  quantity: number;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}
export default Product;

