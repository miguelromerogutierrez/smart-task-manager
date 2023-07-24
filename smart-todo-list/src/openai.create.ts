import { ChatCompletionRequestMessage } from "openai";
import { openai } from "./openai";


export const actionsAI = (prompt: string) => openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "user", content: prompt }
  ],
  functions: [
    {
      name: "addTodoItem",
      description: "User wants to add a new todo item into a specific section",
      parameters: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "The title of the todo item"
          },
          description: {
            type: "string",
            description: "The description of the todo item"
          },
          section: {
            type: "number",
            description: "the section name to add the new todo item"
          }
        }
      }
    }
  ]
})

export function startCreateAccountAI(accountNumber, expirationDate, moneyAmount) {
  console.log(`AN: ${accountNumber}, ED: ${expirationDate}, MA: ${moneyAmount}`)
}

export function _startCreateAccountAI(prompt) {
  const messages: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: "You are an algorithm that will help to extract information"
    },
    {
      role: "user",
      content: `Extract the next list of parameters:\n1. account number.\n2. expiration date with format MM/YY.\n3. money amount.`
    },
    {
      role: "assistant",
      content: `Sure! Could you please provide me with the context or specific information from which I can extract these parameters?`,
    },
    {
      role: "user",
      content: "I want to create a new account. The info is: account number: 3333-3333-3333-3333, exp date: 12/25, amount: $2000\n\nGive me the parameters in the next format: [ACCOUNT NUMBER VALUE | EXPIRATION DATE VALUE | MONEY AMOUNT printed as natural number]",
    },
    {
      role: "assistant",
      content: "[3333-3333-3333-3333 | 12/25 | 2000]",
    },
    {
      role: "user",
      content: "Correct! Let's try with a different information."
    },
    {
      role: "assistant",
      content: `Sure! Could you please provide me with the context or specific information from which I can extract these parameters?`,
    },
  ]
  const messagesValidate: ChatCompletionRequestMessage[] = [
    {
      role: "system",
      content: "You are an algorith to find the missing parameters in a sentence"
    },
    {
      role: "user",
      content: "based on the parameters: Account Number, Expiration Date, Money Amount"
    },
    {
      role: "user",
      content: "Find the missing parameters in the next sentence:\nI want to create a new account. The info is amount: $2000"
    },
    {
      role: "assistant",
      content: "Missing Parameters: [\"Account Number\", \"Expiration Date\"]"
    },
    {
      role: "user",
      content: "Correct!, Let's try with a different information\n\nFind the missing parameters in the next sentence:\nI want to create a new account. The info is account number: 3333-3333-3333-3333, exp date: 12/25, amount: $3500"
    },
    {
      role: "assistant",
      content: "Non Missing Parameters"
    },
    {
      role: "user",
      content: "Correct again!"
    },
    {
      role: "assistant",
      content: "Let's try with a different information."
    }
  ]


  return async () => {
    const missingParametersChat = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [...messagesValidate, { role: "user", content: prompt }]
    })
    if (missingParametersChat.data.choices[0].message.content) {

    }
  }
}


/**
 * 
 * Funny story about my first conversation with chatGPT, i found that CGPT can be trained to resolve algorithms extracted from a natural language
 * That is incredible, this were some of the prompts that I used to train it.
 * I wonder if you can create a cycle conversation between two AIs by giving a cycle constraints in their response like:
 * 
 * ML1
 * IF TRUE THEN FALSE, DO YOU UNDERSTAND?
 * 
 * ML2
 * IF FALSE THEN TRUE, DO YOU UNDEERSTAND?
 * 
 * CONNECT BY TWO SERVICES AND START CONVERSATION FROM ML1 TO ML2
 * 
Which of the next parameters are missing in the sentence?
Parameters= [account number, expiration date with format MM/YY, money amount]
Sentence= "I want to create a new account. The info is: account number: 3333-3333-3333-3333, exp date: 12/25, amount: $2000"
Missing Parameters in Sentence =

Extract the next list of parameters:
1. account number
2. expiration date with format MM/YY
3. money amount


Parameters = [account number, expiration date with format MM / YY, money amount]
Sentence = "I want to create a new account. The info is: account number: 3333-3333-3333-3333, exp date: 12/25, amount: $2000"
Missing Parameters in Sentence =

Give me the parameters in the next format: ACCOUNT NUMBER VALUE, EXPIRATION DATE VALUE, MONEY AMOUNT AS NUMBER

Let's try again. Give me the parameters in the next format: "[ACCOUNT NUMBER VALUE | EXPIRATION DATE VALUE | MONEY AMOUNT printed as natural number]"

 */
/**
 * NOTA 2 SOBRE CHATGPT
 * ES CURIOSO PORQUE AHORA QUE ESTOY PROGRAMANDO LA ML, PARECE SER QUE LA PROGRAMO COMO SI FUERAN CASOS DE PRUEBA Y EL EXPECTED OUTPUT, VAMOS A VER
 * SI ESO FUNCIONA PORQUE NO ES SEGURO, PERO ESTARIA DE HUEVOS, TENGO FE
 * 
 */