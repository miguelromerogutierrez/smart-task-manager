import * as React from "react"
import { TodoContextI } from "./types"
import { TodoService } from "./todo-service"
import { api } from "./api"

export const TodoContext = React.createContext<TodoContextI>({
  todoService: null,
})

export const TodoProvider = (props: any) => {
  const todoService = React.useMemo(() => new TodoService(api), [api])

  return (
    <TodoContext.Provider {...props} value={{ todoService }} />
  )
}

export const useTodoContext = () => React.useContext(TodoContext)