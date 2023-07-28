import { Box, Grid, Heading } from "@chakra-ui/react"
import React from "react"
import { SectionsList } from "./sections-list"
import { useTodoService } from "./todo-service"
import { ChatContainer } from "./chat-component/chat-container"
import { useSocketConnection } from "./socket/use-socket"
import { TaskSection } from "./components/molecules/tast-section/tast-section"

export const TodoPage = () => {
  // const { getTodos, sections } = useTodoService()
  const { isConnected } = useSocketConnection()

  // React.useEffect(() => {
  //   getTodos()
  // }, [])

  return (
    <>
      <Heading>Smart Todo app</Heading>
      <TaskSection title="Section 1" tasks={[{title : "task 1", responsible: "Adan", deadline: "25 Jul"}, {title : "task 1", responsible: "Adan", deadline: "25 Jul"}, {title : "task 1", responsible: "Adan", deadline: "25 Jul"}]}/>
      
      <Grid templateColumns={'repeat(2, 1fr)'} gap={10}>

        {/* <Box w={400}>
          <Heading>Todo list</Heading>
          <SectionsList
            sections={sections}
          />
        </Box> */}
        <Box w={400}>
          <Heading>Chat bot</Heading>
          {
            isConnected ? <Heading>Connected</Heading> : <Heading>Not connected</Heading>
          }
          <ChatContainer />
        </Box>
      </Grid>
    </>
  )
}