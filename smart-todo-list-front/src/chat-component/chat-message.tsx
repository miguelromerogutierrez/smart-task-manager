import { Avatar, Box } from "@chakra-ui/react";
import React from "react";

export interface ChatMessagePropsI {
  id: number;
  text: string;
  createdAt: Date;
  isOwnMessage: boolean;
  avatarName: string;
}

const ContainerStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  alignItems: "center" as const,
}
const ContainerStyle2: React.CSSProperties = {
  display: "flex",
  width: "80%",
  borderRadius: "10px",
  border: "1px solid #ccc",
  padding: "10px",
  margin: "10px",
  alignItems: "center" as const,
}

const OnwerVariantStyle: React.CSSProperties = {
  flexDirection: "row" as const,
  justifyContent: "flex-start" as const,
}
const OtherVariantStyle: React.CSSProperties = {
  flexDirection: "row-reverse" as const,
  justifyContent: "right" as const,
}

const OnwerVariantStyle2: React.CSSProperties = {
  backgroundColor: "#ccc",
  color: "#000",
}
const OtherVariantStyle2: React.CSSProperties = {
  backgroundColor: "#000",
  color: "#fff",
}

export const ChatMessage = (props: ChatMessagePropsI) => {
  return (
    <Box style={Object.assign({}, ContainerStyle, !props.isOwnMessage ? OnwerVariantStyle : OtherVariantStyle)}>
      <Avatar name={props.avatarName} />
      <Box style={Object.assign({}, ContainerStyle2, !props.isOwnMessage ? OnwerVariantStyle2 : OtherVariantStyle2)}>
        <div>{props.text}</div>
      </Box>
    </Box>
  )
}
