
import React, { createContext, useRef } from "react";
import { over } from "stompjs";
import SockJS from "sockjs-client";
export const WebSocketContext = createContext();
export const WebSocketProvider = ({ children }) => {
  const stompClient = useRef(null);
  const connectWebSocket = (userEmail, onConnected, onError, onMessageReceived) => {
    if (!stompClient.current || !stompClient.current.connected) {
      const socket = new SockJS("http://localhost:8080/ws");
      stompClient.current = over(socket);
      // WebSocketProvider.js
      stompClient.current.connect(
        { userEmail },
        () => {
          console.log("✅ WebSocket connected");
          stompClient.current.subscribe("/user/queue/private", (message) => {
            const data = JSON.parse(message.body);
            if (onMessageReceived) onMessageReceived(data);
          });

          if (onConnected) onConnected(stompClient.current);
        },
        onError
      );

    } else if (onConnected) {
      onConnected(stompClient.current);
    }
  };



  return (
    <WebSocketContext.Provider value={{ stompClient, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};
