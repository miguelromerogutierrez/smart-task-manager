const openai = require('./openai');
const _get = require('lodash.get');

const sessionMessages = [
  {
    role: "system",
    content: "You're an assisstant in a task manager application. You can do things like load, filter  and add new tasks. Please start with a greeting message."
  },
]

async function chatBot(prompt) {
  if (prompt) {
    sessionMessages.push({ role: "user", content: prompt })
  }
  let completition = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: sessionMessages,
    functions: [
      {
        name: "add_task",
        description: "User wants to add a new task item into a specific section",
        parameters: {
          type: "object",
          properties: {
            title: {
              type: "string",
              description: "The title of the task item"
            },
            description: {
              type: "string",
              description: "The description of the task item"
            },
            section: {
              type: "number",
              description: "the section name to add the new task item"
            }
          }
        }
      }
    ]
  })

  console.log(completition.data.choices[0])
  const functionCall = _get(completition, 'data.choices[0].message.function_call', {})
  if (validateIfCompletionIsAnAction(functionCall.name)) {
    let result = handleAddTaskAction(functionCall)
    console.log(result)
    return result
  }

  console.log(completition.data.choices[0])
  return completition.data.choices[0].text
}

function validateIfCompletionIsAnAction(completion) {
  return completion.includes("add_task")
}

function handleAddTaskAction(functionCall) {
  const parameters = functionCall.parameters
  const title = parameters.title
  const description = parameters.description
  const section = parameters.section
  return `Added a new task with title ${title}, description ${description} and section ${section}`
}

module.exports = {
  chatBot,
}
