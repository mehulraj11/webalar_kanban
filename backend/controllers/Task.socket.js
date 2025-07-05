import Task from "../models/TaskSchema.js";

export const addTask = async (taskData, callback) => {
    try {
        const task = await Task.addTask(taskData);
        callback({ status: 'success', task }); // optional ack callback
    } catch (err) {
        callback({ status: 'error', message: err.message });
    }
};

export const updateTask = async ({ taskId, updatedData }, callback) => {
    try {
        const task = await Task.updateTask(taskId, updatedData);
        callback({ status: 'success', task });
    } catch (err) {
        callback({ status: 'error', message: err.message });
    }
};

export const getTasks = async (sectionId, callback) => {
    try {
        const tasks = await Task.getTasksBySection(sectionId);
        callback({ status: 'success', tasks });
    } catch (err) {
        callback({ status: 'error', message: err.message });
    }
};

export const deleteTask = async (taskId, callback) => {
    try {
        await Task.deleteTask(taskId);
        callback({ status: 'success', taskId });
    } catch (err) {
        callback({ status: 'error', message: err.message });
    }
};

export const moveTask = async ({ taskId, sourceSectionId, destinationSectionId }, callback) => {
    try {
        const task = await Task.moveTask(taskId, sourceSectionId, destinationSectionId);
        callback({ status: 'success', task });
    } catch (err) {
        callback({ status: 'error', message: err.message });
    }
};
