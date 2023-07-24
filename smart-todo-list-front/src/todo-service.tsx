import React from "react";
import { APIType, TODO_AI_API_URL, TODO_API_URL, api } from "./api";
import { Section, Todo, TodoSaveSchema } from "./types";
import { useTodoContext } from "./todo-context";

export class TodoService {
  sections: Section[] = [];
  hooks: React.Dispatch<React.SetStateAction<Section[]>>[] = [];

  constructor(private api: APIType) { }

  async getTodos(): Promise<Section[]> {
    const response = await this.api.get<Section[]>(TODO_API_URL);
    if (response.data) {
      this.sections = response.data;
      this.executeHooks();
      return response.data;
    }
    throw new Error("Failed to get todos");
  }

  async createTodo(todo: TodoSaveSchema): Promise<Section> {
    const response = await this.api.post<Todo>(TODO_API_URL, todo);
    if (response.data) {
      const section = this.sections.find((section) => section.id === todo.sectionId);
      if (section) {
        section.todos.push(response.data);
        this.executeHooks();
        return section;
      }
    }
    throw new Error("Failed to create todo");
  }

  async createTodoAI(prompt: string): Promise<Section> {
    const response = await this.api.post<Section>(TODO_AI_API_URL, { content: prompt });
    if (response.data) return response.data;
    throw new Error("Failed to create todo");
  }

  syncStateWithHook(hook: React.Dispatch<React.SetStateAction<Section[]>>) {
    hook(this.sections);
  }

  // register a new hook to be called when the state changes
  registerHook(hook: React.Dispatch<React.SetStateAction<Section[]>>) {
    this.hooks.push(hook);
  }

  // execute all the hooks
  executeHooks() {
    this.hooks.forEach((hook) => hook(this.sections));
  }

  // unregister a hook
  unregisterHook(hook: React.Dispatch<React.SetStateAction<Section[]>>) {
    this.hooks = this.hooks.filter((h) => h !== hook);
  }
}

type useTodoServiceType = () => {
  sections: Section[],
  isLoading: boolean,
  error: Error | null,
  getTodos: () => void,
  createTodo: (todo: TodoSaveSchema) => void,
}
export const useTodoService: useTodoServiceType = () => {
  const { todoService } = useTodoContext();

  const [sections, setSections] = React.useState<Section[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  if (todoService === null) throw new Error("Todo service is null")

  React.useEffect(() => {
    todoService.syncStateWithHook(setSections);
    todoService.registerHook(setSections);

    return () => {
      todoService.unregisterHook(setSections);
    }
  }, [todoService, setSections]);


  const getTodos = React.useCallback(async () => {
    setIsLoading(true);
    setError(null)
    try {
      await todoService.getTodos();
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [todoService]);

  const createTodo = React.useCallback(async (todo: TodoSaveSchema) => {
    setIsLoading(true);
    setError(null)
    try {
      await todoService.createTodo({
        ...todo,
      });
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [todoService]);

  return {
    sections,
    isLoading,
    error,
    getTodos,
    createTodo,
  }
}