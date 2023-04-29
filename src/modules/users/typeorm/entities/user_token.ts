import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
class UserToken {
  @PrimaryGeneratedColumn('increment')
  id:string;

  @Column()
  @Generated('uuid')
  token:string;

  @Column()
  userId:string;

  @CreateDateColumn()
  createdAt:Date;

  @UpdateDateColumn()
  updatedAt:Date;
}
export default UserToken;
