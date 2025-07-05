import * as TaskController from '../controllers/Task.socket.js';

export const taskRoutes = (socket) => {
  socket.on("task:add", TaskController.addTask);
  socket.on("task:update", TaskController.updateTask);
  socket.on("task:get", TaskController.getTasks);
  socket.on("task:delete", TaskController.deleteTask);
  socket.on("task:move", TaskController.moveTask);
};
