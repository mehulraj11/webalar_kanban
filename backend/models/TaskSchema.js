import mongoose from 'mongoose';
import Section from './SectionSchema.js';

// Define Task Schema
const taskSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    dueDate: { type: Date, required: true },
    assignee: { type: String, required: true },
    section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

// Add Task
export const addTask = async ({ name, description, dueDate, assignee, section }) => {
    try {
        const sectionDoc = await Section.findById(section);
        if (!sectionDoc) throw new Error("Section does not exist");

        const newTask = new Task({ name, description, dueDate, assignee: assignee.trim(), section: sectionDoc._id });

        sectionDoc.tasks.push(newTask._id);
        await sectionDoc.save();

        return await newTask.save();
    } catch (error) {
        throw new Error(error.message);
    }
};

// Get Tasks by Section
export const getTasksBySection = async (section) => {
    return await Task.find({ section });
};

// Update Task
export const updateTask = async (id, updatedTask) => {
    try {
        const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
        if (!task) throw new Error("Task not found");
        return task;
    } catch (error) {
        throw new Error(error.message);
    }
};

// Delete Task
export const deleteTask = async (id) => {
    return await Task.findByIdAndDelete(id);
};

// Move Task to another section
export const moveTask = async (taskId, sourceSectionId, destinationSectionId) => {
    try {
        const sourceSection = await Section.findById(sourceSectionId);
        const destinationSection = await Section.findById(destinationSectionId);

        if (!sourceSection || !destinationSection) {
            throw new Error('Source or Destination section not found');
        }

        const task = await Task.findById(taskId);
        if (!task) throw new Error('Task not found');

        // Remove from source
        sourceSection.tasks = sourceSection.tasks.filter(id => id.toString() !== taskId.toString());
        await sourceSection.save();

        // Update task section
        task.section = destinationSectionId;
        await task.save();

        // Add to destination
        destinationSection.tasks.push(task._id);
        await destinationSection.save();

        return await Task.findById(taskId).populate("section");
    } catch (err) {
        throw new Error(err.message);
    }
};

export default Task;
