
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./app/routes/note_routes.js']

const doc = {
    info: {
        version: "0.0.1",
        title: "KeepNote API",
        description: ""
    },
    host: "localhost:8000",
    basePath: "/",
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Notes",
            "description": "Endpoints"
        }
    ],
    definitions: {
        Notes: {
            title: "Buy Grocery",
            body: "Mon, Wed, Fri schedule to buy groceries"
        },
        AddNote: {
            $title: "Buy Grocery",
            $body: "Mon, Wed, Fri schedule to buy groceries"
        }
    }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js')
})