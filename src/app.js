'use strict';

const noteRoutes = require('./routes/note_routes');

module.exports = function(app, db) {
    noteRoutes(app, db);
};
