let socket: WebSocket | null = null;

export const connectWebSocket = (
  userId: number,
  onMessage: (data: any) => void,
): void => {
socket = new WebSocket(`ws://10.0.2.2:8080/spendwise/ws/balance/${userId}`);


  socket.onopen = () => {
    console.log("WebSocket connected");
  };

  socket.onmessage = (event) => {
    const parsed = JSON.parse(event.data);
    onMessage(parsed);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error", error);
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };
};

export const sendMessage = (message: string): void => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(message);
  } else {
    console.warn("WebSocket is not connected");
  }
};

export const closeConnection = (): void => {
  socket?.close();
  socket = null;
};
