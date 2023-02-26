import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('produts')
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
  updateAt:Date;
}
export default Product;
