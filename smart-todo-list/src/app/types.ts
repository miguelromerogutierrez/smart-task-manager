import { Section } from "src/section.entity"

export const TODO_STATUS_ENUM = ["DONE", "PENDING", "DELETED", "DRAFT"] as const
export type TodoStatusEnum = typeof TODO_STATUS_ENUM[number]

export interface CreateTodoRequestI {
  title: string
  description: string
  sectionId: number
  status?: TodoStatusEnum
}

export interface CreateSectionReqI {
  name: string
}

export interface AddTodoItemParamsI {
  title?: string
  description?: string
  section?: number
  status?: TodoStatusEnum
}

export type AIParamsEnum = keyof AddTodoItemParamsI
export const CREATE_TODO_AI_FLOW = ["MISSING_PROPERTIES", "CREATED"] as const
export type CreateTodoAIFlow = typeof CREATE_TODO_AI_FLOW[number]

export interface AIFlowResponse {
  step: CreateTodoAIFlow
  missingParams?: AIParamsEnum[]
  paramsFound?: AddTodoItemParamsI
}

export interface GetSectionsResponseI {
  countOfSections: number
  sections: Section[]
}