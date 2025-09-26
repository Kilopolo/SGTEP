import { Server } from "socket.io";
import http from "http";
import app from "./app.js"; // tu express

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado:", socket.id);

  socket.on("join_note", ({ noteId, userId }) => {
    socket.join(noteId);
    console.log(`Usuario ${userId} unido a nota ${noteId}`);
  });

  socket.on("update_note", ({ noteId, content }) => {
    // broadcast a todos MENOS al emisor
    socket.to(noteId).emit("note_updated", { content });
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

server.listen(5000, () => console.log("Servidor en http://localhost:5000"));
