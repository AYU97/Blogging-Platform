const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Blog API",
      description: "API for managing blog posts",
      version: "1.0.0",
    },
    securityDefinitions: {
      JWT: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
      },
    },
    basePath: "/",
  },
  apis: ["./routes/*.js"], // Path to the files containing Swagger annotations
};

// Initialized Swagger-jsdoc
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(swaggerDocs),
};
