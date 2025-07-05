import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import { taskRoutes } from "./routes/taskRoutes.js";
import { registerSectionHandlers } from "./sections/section.socket.js";
dotenv.config();

const app = express();
connectDB();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(morgan("dev"));
app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  taskRoutes(socket);
  registerSectionHandlers(socket, io);
});

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
export { io };