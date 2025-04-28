'use strict'

import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import productsRoutes from "../src/products/products.routes.js";

class ExpressServer {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        try {
            await dbConnection();
        } catch (err) {
            console.log(`Database connection failed: ${err}`);
            process.exit(1);
        }
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(apiLimiter);
    }

    routes() {
        this.app.use("/almacenadora/v1/products", productsRoutes);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export const initServer = () => {
    const server = new ExpressServer();
    server.listen();
};

export default ExpressServer;