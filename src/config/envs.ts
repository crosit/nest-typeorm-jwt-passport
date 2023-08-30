require("dotenv").config();

const config = {
    APP_PORT: process.env.APP_PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    typeorm: {
        type: process.env.TYPEORM_TYPE,
        host: process.env.TYPEORM_HOST,
        port: process.env.TYPEORM_PORT,
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
        synchronize: process.env.TYPEORM_SYNCHRONIZE,
        timezone: process.env.TYPEORM_TIMEZONE,
    },
};

export default config;