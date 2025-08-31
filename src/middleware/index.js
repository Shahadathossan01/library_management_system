const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const OpenApiValidator = require("express-openapi-validator");
const swaggerDoc = YAML.load("./swagger.yaml");
const applyMiddleware = (app) => {
  app.use(express.json());
  app.use(morgan("dev"));
  app.use(cors({ origin: "*" }));
  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  app.use(
    OpenApiValidator.middleware({
      apiSpec: "./swagger.yaml",
      ignorePaths:
        /\/api\/v1\/books(\/\d+)?|\/api\/v1\/books\/|\/api\/v1\/users(\/\d+)?/,
    })
  );
};

module.exports = applyMiddleware;
