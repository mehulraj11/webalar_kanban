import express from "express";
import http from 'http';
import { Server } from 'socket.io';
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import authRoutes from "./routes/userRoutes.js";
import morgan from "morgan";
import { taskRoutes } from "./routes/taskRoutes.js";
import { sectionRoutes } from './routes/sectionRoutes.js';

dotenv.config();

const app = express();
connectDB();

// const server = http.createServer(app);

const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5500"
];

// const io = new Server(server, {
//   cors: {
//     origin: allowedOrigins,
//     credentials: true
//   }
// });

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());

// io.on("connection", (socket) => {
//   console.log("User connected:", socket.id);
//   taskRoutes(socket);
//   sectionRoutes(socket, io);
// });

app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// export { io };
