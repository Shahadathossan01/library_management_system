const express=require('express')
const morgan=require('morgan')
const cors=require('cors')
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const OpenApiValidator = require('express-openapi-validator');
const swaggerDoc=YAML.load('./swagger.yaml')
const applyMiddleware=(app)=>{
    app.use(express.json())
    app.use(morgan('dev'))
    app.use(cors())
    app.use('/docs',swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    app.use(
        OpenApiValidator.middleware({
            apiSpec:'./swagger.yaml',
            ignorePaths: /\/api\/v1\/books/
        })
    )
}

module.exports=applyMiddleware;