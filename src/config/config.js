const Joi = require('joi');

const envSchema = Joi.object({
    APP_ID: Joi.string().required(),
    APP_SECRET: Joi.string().required(),
    DB_URI: Joi.string().required(),
    JWT_SECRET: Joi.string().required(),
    PORT: Joi.number().default(3000),
    REDIS_HOST: Joi.string().required(),
    REDIS_PORT: Joi.number().default(6379),
    REDIS_PASSWORD: Joi.string().optional(),
}).unknown();

const { error, value: envVars } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

module.exports = envVars;
