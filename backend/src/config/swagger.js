const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Instant Mechanic API",
      version: "1.0.0",
      description:
        "API documentation for the Instant Mechanic vehicle service operations dashboard.",
    },

    servers: [
      {
        url:
          process.env.RENDER_EXTERNAL_URL ||
          "http://localhost:5000",
        description: "API server",
      },
    ],
  },

  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;