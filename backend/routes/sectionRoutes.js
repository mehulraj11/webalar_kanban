import * as SectionRoutes from '../controllers/Section.socket.js';

export const sectionRoutes = (socket, io) => {
    socket.on("section:get", (data, callback) => {
        SectionRoutes.getSections(data, callback, socket);
    });

    socket.on("section:add", (data, callback) => {
        SectionRoutes.addSection(data, callback, socket, io);
    });

    socket.on("section:delete", (id, callback) => {
        SectionRoutes.deleteSection(id, callback, socket, io);
    });

    socket.on("section:update", (data, callback) => {
        SectionRoutes.updateSection(data, callback, socket, io);
    });
};
