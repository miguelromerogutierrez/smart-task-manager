import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Section } from "./section.entity";
import { TODO_STATUS_ENUM, TodoStatusEnum } from "src/app/types";


@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column({ enum: TODO_STATUS_ENUM })
  status: TodoStatusEnum

  @Column("integer")
  createdAt: number

  @ManyToOne(() => Section, (section) => section.todos)
  @JoinColumn()
  section: Section
}