import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { CreateSectionReqI, CreateTodoRequestI } from './types';

@Controller('todo')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }

  @Post("ai")
  async createAI(@Body() body: any, @Res() response: Response) {
    const content = body.content;
    const flow = await this.appService.aiActions(content);

    response.setHeader("Content-Type", "application/json")
    response.send(flow)
  }

  @Post()
  async create(@Res() response: Response, @Body() body: CreateTodoRequestI) {
    let todo = await this.appService.createTodo(body)
    response.setHeader("Content-Type", "application/json")
    response.status(200)
    response.send(todo)
  }

  @Post('/section')
  async createSection(@Res() response: Response, @Body() body: CreateSectionReqI) {
    let section = await this.appService.createSection(body)
    response.setHeader("Content-Type", "application/json")
    response.status(200)
    response.send(section)
  }

  @Get()
  async findAll() {
    return await this.appService.getSectionsAndTodos()
  }

}
