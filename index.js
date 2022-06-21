require('dotenv').config();
const express = require('express');
const cors = require("cors");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
var corsOptions = {
    origin: "http://localhost:3000"
};
const port = process.env.PORT;
const routes = require('./src/routes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const definition = {
    openapi: '3.0.0',
    info: {
        title: 'Api Test Developer Backend', 
        version: '1.0.0',
        description: 'API Documentation for use',
        contact:{
            name:'Diego Inostroza'
        },
        servers: [
            {
              url: 'http://localhost:8080',
              description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        }
    },
};
  
const swaggerOptions = {
    definition,
    apis: ['./src/routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use('/', express.static('./public'));
app.use(...routes);


app.listen(port, () => {
    console.log('App is listening port ' + port);
});
  