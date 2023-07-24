// Let's build a chat messages list component that will hold all the chat messages.

import React from "react"
import { ChatMessage, ChatMessagePropsI } from "./chat-message"
import { Box } from "@chakra-ui/react"

export interface ChatMessagesListPropsI {
  chatMessages: ChatMessagePropsI[]
}
const ListContainerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column" as const,
  height: "100%",
  width: "100%",
  padding: "10px",
}
export const ChatMessagesList = (props: ChatMessagesListPropsI) => {
  return (
    <Box style={ListContainerStyle}>
      {props.chatMessages.map((chatMessage) => (
        <ChatMessage key={chatMessage.id} {...chatMessage} />
      ))}
    </Box>
  )
}
