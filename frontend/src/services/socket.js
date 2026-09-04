import { io } from "socket.io-client";

const socketURL =
  import.meta.env.VITE_API_URL?.replace(/\/+$/, "");

const socket = io(socketURL, {
  transports: ["websocket"],
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

export default socket;
