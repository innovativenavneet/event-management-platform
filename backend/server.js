import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import { Server } from "socket.io";
import http from "http";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("join_event", (eventId) => {
    socket.join(eventId);
  });
  socket.on("update_attendees", (eventId) => {
    io.to(eventId).emit("refresh_attendees");
  });
});

server.listen(5000, () => console.log("Server running on port 5000"));
