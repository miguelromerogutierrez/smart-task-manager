import { create } from "apisauce";

export const api = create({
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json"
  }
})
export type APIType = typeof api

export const TODO_API_URL = '/todo'
export const TODO_AI_API_URL = '/todo/ai'
export const SECTION_API_URL = '/todo/section'