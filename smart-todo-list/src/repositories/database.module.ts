import { TypeOrmModule } from '@nestjs/typeorm';
import { Section } from 'src/section.entity';
import { Todo } from 'src/todo.entity';
const path = require("path")

const root = "/Users/miguel.romero/Workspace/smart-todo-list/"

let database = path.join(root, "./mydb.sql")
export const DBModule = TypeOrmModule.forRoot({
  type: "sqlite",
  database: database,
  entities: [Todo, Section],
  synchronize: true
})