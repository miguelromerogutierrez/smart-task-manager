import { AddTodoItemParamsI, TODO_STATUS_ENUM, TodoStatusEnum } from "./types";

export class AddTodoItemParams {
  constructor(
    params: AddTodoItemParamsI
  ) {
    this.params = {
      description: params.description,
      section: params.section,
      title: params.title,
      status: params.status || "DRAFT"
    }
  }

  validateRequire() {
    if (this.params.section === undefined) {
      return false
    }
    if (this.params.title === undefined) {
      return false
    }
    return true
  }

  validateStatus() {
    if (this.params.status === undefined) {
      return false
    }
    if (TODO_STATUS_ENUM.includes(this.params.status)) {
      return true
    }

    return false
  }

  getMissingProps() {
    const paramKeys = Object.keys(this.params)
    const missingParams = []
    for (let paramKey of paramKeys) {
      if (this.params[paramKey] === undefined) {
        missingParams.push(paramKey)
      }
    }
    return missingParams
  }

  getParamsFounded() {
    const paramKeys = Object.keys(this.params)
    const params = {}
    for (let paramKey of paramKeys) {
      if (this.params[paramKey] !== undefined) {
        params[paramKey] = this.params[paramKey]
      }
    }
    return params
  }

  params: AddTodoItemParamsI
}