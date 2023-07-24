import React from "react";
import { ChatInput } from "./chat-input";
import { ChatMessagesList } from "./chat-messages-list";
import { useChatMessages } from "./use-chat-messages";
import { useSocketMessages } from "../socket/use-socket";

export const ChatContainer = () => {
  const { messages, addMessage } = useChatMessages()
  const { sendMessage } = useSocketMessages()

  const handleChatInputSubmit = (message: string) => {
    sendMessage(message)
  }
  return (
    <div>
      <ChatMessagesList chatMessages={messages} />
      <ChatInput onSubmit={handleChatInputSubmit} />
    </div>
  )
}
