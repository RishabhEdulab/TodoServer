import { ObjectIdColumn, Entity, Column } from "typeorm";
import { ObjectId } from "mongodb";
@Entity()
export class Register {
  @ObjectIdColumn()
  _id: ObjectId;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column()
  age: number;
  @Column()
  city: string;
  @Column()
  gender: string;
  @Column()
  address: string;
}
