
// Require all dependencies
const express = require('express');
const port = 8000;

// Parser package
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

// Swagger documentation
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

// Use in-memory sqlite3 as database
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory');

// Get table schema and initialize
const buildSchemas = require('./config/db_schemas');
db.serialize(() => {
    buildSchemas(db);
});

// Initialize the app as an instance of Express
const app = express();

// Since express cannot process URL encoded on its own, use the body-parser package
app.use(bodyParser.urlencoded( { extended: true }));

// Initialize swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Import note routes here, passed the app and db instance
require('./app/routes')(app, db, {});

// When server up and running tell the app to start listening to HTTP request
app.listen(port, () => console.log(`Notable app started and listening on port ${port}`));
