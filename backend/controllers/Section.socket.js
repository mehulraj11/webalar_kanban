import Section from '../models/SectionSchema.js';

export const registerSectionHandlers = (socket, io) => {
  socket.on("section:get", async () => {
    try {
      const sections = await Section.find().populate("tasks").sort({ createdAt: 1 });
      socket.emit("section:list", sections);
    } catch (err) {
      socket.emit("error", "Error fetching sections");
    }
  });

  socket.on("section:add", async ({ name, selectedSectionId }) => {
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
    } catch (err) {
      socket.emit("error", "Error adding section");
    }
  });

  socket.on("section:delete", async (id) => {
    try {
      await Section.findByIdAndDelete(id);
      io.emit("section:deleted", id);
    } catch (err) {
      socket.emit("error", "Error deleting section");
    }
  });

  socket.on("section:update", async ({ id, name }) => {
    try {
      const updated = await Section.findByIdAndUpdate(id, { name }, { new: true });
      io.emit("section:updated", updated);
    } catch (err) {
      socket.emit("error", "Error updating section");
    }
  });
};
