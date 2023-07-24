import { Button, Flex, Textarea } from '@chakra-ui/react';
import React from 'react';

export interface ChatInputPropsI {
  onSubmit: (message: string) => void
}
export const ChatInput = (props: ChatInputPropsI) => {
  const [value, setValue] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }

  const handleButtonClick = () => {
    props.onSubmit(value);
  }
  return (
    <Flex>
      <Textarea placeholder="Write something to your assisstant..." value={value} onChange={handleChange} />
      <Button colorScheme="blue" onClick={handleButtonClick}>Send</Button>
    </Flex>
  );
}