import React, { useEffect, useRef, useState } from "react";
import { Box, Flex, Input, IconButton } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const Chatbox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const chatboxRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (inputText.trim() === "") return;

    setMessages([
      ...messages,
      { id: Date.now(), text: inputText, isUser: true },
    ]);
    setInputText("");

    setTimeout(() => {
      const botResponse = "Hello, I'm a chatbot";
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, text: botResponse, isUser: false },
      ]);
    }, 1000);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      width="300px"
      height="400px"
      bg="gray.200"
      border="1px solid gray"
      borderRadius="md"
      p="4"
    >
      <Flex direction="column" height="100%">
        <Flex
          direction="column"
          flex="1"
          overflowY="auto"
          mb="4"
          ref={chatboxRef}
        >
          {messages.map((message) => (
            <Box
              key={message.id}
              alignSelf={message.isUser ? "flex-end" : "flex-start"}
              bg={message.isUser ? "blue.500" : "gray.500"}
              color="white"
              borderRadius="md"
              p="2"
              mt="2"
              ml={message.isUser ? "2" : "0"}
              mr={message.isUser ? "0" : "2"}
              maxWidth="80%"
            >
              {message.text}
            </Box>
          ))}
        </Flex>
        <Flex align="center">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
          />
          <IconButton
            aria-label="Send"
            icon={<ArrowForwardIcon />}
            onClick={handleSend}
            ml="2"
            size="sm"
            colorScheme="blue"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Chatbox;
