'use strict';

// Dependencies
const express = require('express');
const bodyParser = require('body-parser');

const port = 8000;

// Initialize the app as an instance of Express
const app = express();

// Parser package
const jsonParser = bodyParser.json();// To support JSON-encoded bodies
app.use(
    bodyParser.urlencoded({
        // To support URL-encoded bodies
        extended: true,
    })
);

// Initialize in-memory sqlite3 as database and create schema
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory');
const buildSchemas = require('./src/config/db-schemas');
db.serialize(() => {
    buildSchemas(db);
});

// Swagger documentation configuration
const swaggerUi = require('swagger-ui-express');
const swaggerDocumentation = require('./src/docs/swagger-documentation');
const swaggerDefinition = {
    openapi: '3.0.1',
    info: {
        title: 'KeepNote API',
        version: '0.0.1',
        description: 'KeepNote API management. It allows to create/update/delete/retrieve notes.',
    },
    servers: [
        {
            url: `http://localhost:${port}`,
            description: 'Local server'
        }
    ]
};
const swaggerJSDocOptions = {
    swaggerDefinition,
    swaggerDocumentation,
    // Paths to files containing OpenAPI definitions
    apis: ['./src/docs/*.js', './src/routes/*.js'],
};
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerSpec = swaggerJSDoc(swaggerJSDocOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import note routes here, passed the app and db instance
require('./src/app')(app, db, {});

// When server up and running tell the app to start listening to HTTP request
app.listen(port, () => console.log(`KeepNote app started and listening on port ${port}`));