const Hapi = require('@hapi/hapi');
const notes = require('./api/notes');
// const NotesService = require('./services/inMemory/noteServices');
const NotesService = require('./services/postgres/noteServices');
const NotesValidator = require('./validator/notes');

// mengimpor dotenv dan menjalankan konfigurasinya
require('dotenv').config();

const init = async () => {
    const notesService = new NotesService();
    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        options: {
            service: notesService,
            validator: NotesValidator,
        },
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();