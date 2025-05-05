'use strict'
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { hash } from "argon2";
import { dbConnection } from './mongo.js';
import User from "../src/user/user.model.js";
import movementRoutes from "../src/movement/movement.routes.js";
import { swaggerDocs, swaggerUi } from "./swagger.js";

class ExpressServer {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);

        this.middlewares();
        this.conectarDB().then(() => {this.defaultAdministratorAccount(); });
        this.routes();
    }

    async conectarDB(){
        try {
            await dbConnection();
        } catch (err) {
            console.log(`Database connection failed: ${err}`);
            process.exit(1);
        }
    }

    defaultAdministratorAccount = async () => {
        try {
            const admin = await User.findOne({ role: "ADMINISTRATOR" });
            if (admin) return; 
    
            const defaultAdmin = {
                completeName: "Braulio Jose Echeverria Montufar",
                email: "braulio@gmail.com",
                role: "ADMINISTRATOR",
                password: await hash("AdminPass@123", 10)
            };
    
            await User.create(defaultAdmin);
    
        } catch (err) {
            throw new Error('Failed to create default admin account');
        }
    };

    middlewares(){
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes(){
        this.app.use("/warehouseManagement/v1/movement", movementRoutes);
        this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default ExpressServer;

