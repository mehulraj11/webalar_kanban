import Section from '../models/SectionSchema.js';

export const getSections = async (data, callback, socket) => {
    try {
        const sections = await Section.find().populate("tasks").sort({ createdAt: 1 });
        callback(sections);
    } catch (err) {
        socket.emit("error", "Error fetching sections");
    }
};

export const addSection = async ({ name, selectedSectionId }, callback, socket, io) => {
    try {
        let creationDate = new Date();

        if (selectedSectionId) {
            const selectedSection = await Section.findById(selectedSectionId);
            if (selectedSection) {
                creationDate = new Date(new Date(selectedSection.createdAt).getTime() + 1000);
            }
        }

        const newSection = new Section({ name, tasks: [], createdAt: creationDate });
        await newSection.save();
        io.emit("section:added", newSection);
        callback(newSection);
    } catch (err) {
        socket.emit("error", "Error adding section");
    }
};

export const deleteSection = async (id, callback, socket, io) => {
    try {
        await Section.findByIdAndDelete(id);
        io.emit("section:deleted", id);
        callback(id);
    } catch (err) {
        socket.emit("error", "Error deleting section");
    }
};

export const updateSection = async ({ id, name }, callback, socket, io) => {
    try {
        const updated = await Section.findByIdAndUpdate(id, { name }, { new: true });
        io.emit("section:updated", updated);
        callback(updated);
    } catch (err) {
        socket.emit("error", "Error updating section");
    }
};
