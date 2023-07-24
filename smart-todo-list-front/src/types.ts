import { TodoService } from "./todo-service"

export const TODO_STATUS_ENUM = ["DONE", "PENDING", "DELETED", "DRAFT"] as const
export type TodoStatusEnum = typeof TODO_STATUS_ENUM[number]

export interface TodoSaveSchema {
  title: string
  description: string
  sectionId: number
  status?: TodoStatusEnum
}

export interface CreateTodoAIRespI {
  content: string
}

export interface Todo {
  id: number
  title: string
  description: string
  status: TodoStatusEnum
}
export interface Section {
  id: number
  name: string
  todos: Todo[]
}
export interface GetTodosRespI {
  sections: Section[]
}



export interface TodoContextI {
  todoService: TodoService | null
}