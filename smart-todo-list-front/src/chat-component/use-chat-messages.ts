import React from "react";
import { ChatMessagePropsI } from "./chat-message";

// create a list of 5 fake messages with the shape of ChatMessagePropsI
const fakeMessages: ChatMessagePropsI[] = [
  {
    id: 1,
    text: "Hello! I'm your Smart Assitant, you can request me to create a new todo by typing 'create todo' or 'create task' and I will ask you for the details.",
    createdAt: new Date(),
    isOwnMessage: false,
    avatarName: "Smart Assistant",
  },
  // {
  //   id: 2,
  //   text: "Hi",
  //   createdAt: new Date(),
  //   isOwnMessage: true,
  //   avatarName: "Jane Doe",
  // },
  // {
  //   id: 3,
  //   text: "How are you?",
  //   createdAt: new Date(),
  //   isOwnMessage: false,
  //   avatarName: "Smart Assistant",
  // },
  // {
  //   id: 4,
  //   text: "I'm fine, thanks!",
  //   createdAt: new Date(),
  //   isOwnMessage: true,
  //   avatarName: "Jane Doe",
  // },
  // {
  //   id: 5,
  //   text: "Good to hear that!",
  //   createdAt: new Date(),
  //   isOwnMessage: false,
  //   avatarName: "Smart Assistant",
  // },
];

export const useChatMessages = () => {
  // create an state to store the messages, use ChatMessagePropsI as the type
  const [messages, setMessages] = React.useState<ChatMessagePropsI[]>(fakeMessages);

  // add a new message to the state
  const addMessage = (text: string) => {
    const message: ChatMessagePropsI = {
      id: messages.length + 1,
      text: text,
      createdAt: new Date(),
      isOwnMessage: true,
      avatarName: "Jane Doe",
    };
    setMessages((prevMessages) => [...prevMessages, message]);
  };


  return {
    messages,
    addMessage
  }
}