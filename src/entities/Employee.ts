import { Column, Entity, ObjectIdColumn } from "typeorm";
import { ObjectId } from "mongodb";
@Entity()
export class Employee {
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
  gender: string;
}
