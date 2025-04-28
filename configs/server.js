'use strict'

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';

class ExpressServer {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default ExpressServer;

