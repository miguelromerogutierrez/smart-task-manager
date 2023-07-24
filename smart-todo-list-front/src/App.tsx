import React from 'react'
import './App.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TodoPage } from './todo-page'
// import { TodoProvider } from './todo-context'

function App() {

  return (
    <ChakraProvider>
      <TodoPage />
    </ChakraProvider>
  )
}

export default App
