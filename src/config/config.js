require('dotenv').config();

const config = {
    appId: process.env.APP_ID,
    appSecret: process.env.APP_SECRET,
    dbUri: process.env.DB_URI,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000,
};

module.exports = config;
