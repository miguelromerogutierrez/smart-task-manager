import { Injectable } from '@nestjs/common';
import { actionsAI, startCreateAccountAI } from '../openai.create';
import { AIFlowResponse, AddTodoItemParamsI, CreateSectionReqI, CreateTodoAIFlow, CreateTodoRequestI } from './types';
import { Section } from 'src/section.entity';
import { Todo } from 'src/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddTodoItemParams } from './add-todo-item-params.values';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(Todo)
    private todoRepo: Repository<Todo>,
    @InjectRepository(Section)
    private sectionRepo: Repository<Section>,
  ) { }


  async aiActions(prompt: string): Promise<AIFlowResponse> {
    try {
      const resp = await actionsAI(prompt)
      if (resp.data.choices[0].message.function_call.name === "addTodoItem") {
        const params: AddTodoItemParamsI = JSON.parse(resp.data.choices[0].message.function_call.arguments.replace(/\\n/g, "").replace(/\\"/g, "\""))

        const paramsObj = new AddTodoItemParams(params)

        if (paramsObj.validateRequire() && paramsObj.validateStatus()) {
          await this.createTodo({
            title: params.title,
            description: params.description,
            sectionId: params.section,
            status: "PENDING"
          })
          return {
            step: "CREATED",
            paramsFound: paramsObj.getParamsFounded()
          }
        }

        return {
          step: "MISSING_PROPERTIES",
          missingParams: paramsObj.getMissingProps(),
          paramsFound: paramsObj.getParamsFounded()
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  async getTodos() {
    return this.todoRepo.find()
  }

  async getSectionsAndTodos() {
    const sections = await this.sectionRepo.find({
      relations: ["todos"]
    })

    return sections
  }

  async findSectionById(id: number) {
    let sectionsFind = await this.sectionRepo.find({
      where: { id },
    })

    if (sectionsFind.length > 0) {
      return sectionsFind[0]
    }

    return null
  }

  async createTodo(todoRequest: CreateTodoRequestI) {
    const todo = new Todo()
    let section = await this.findSectionById(todoRequest.sectionId)

    todo.title = todoRequest.title
    todo.description = todoRequest.description
    todo.section = section
    todo.createdAt = Date.now()
    todo.status = todoRequest.status || "PENDING"

    await this.todoRepo.save(todo)
    return todo
  }

  async createSection(sectionRequest: CreateSectionReqI) {
    const section = this.sectionRepo.create({
      name: sectionRequest.name,
      todos: []
    })
    await this.sectionRepo.save(section)
    return section
  }
}
