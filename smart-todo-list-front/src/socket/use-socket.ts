import React from "react";
import { socket } from "./socket"

export const useSocketConnection = () => {
  const [isConnected, setIsConnected] = React.useState(false);

  React.useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }
    function onDisconnect() {
      setIsConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    }
  }, []);

  return {
    isConnected,
    socket,
  }
}

// We'll create a hook to handle the messages between socket server an client.
export const useSocketMessages = () => {

  React.useEffect(() => {
    function onMessage(message: any) {
      console.log("message from server", message);
    }
    socket.on("message", onMessage);
    return () => {
      socket.off("message", onMessage);
    }
  }, []);

  const sendMessage = (text: string) => {
    socket.emit("message", text, (message: any) => {
      console.log("message from server", message);
    });
  }

  return {
    sendMessage,
  }
}