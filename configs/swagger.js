import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Warehouse Management API",
            version: "1.0.0",
            description:
                "El objetivo de este proyecto es desarrollar una aplicación web para la administración de una almacenadora de productos, además de la implementación efectiva del Stack MERN (MongoDB, Express, React, Node.js) para lograr un sistema de administración de almacenadora funcional y escalable.",
            contact: {
                name: "IN6BM_Group5",
                email: "anthonyescobarponce@Outlook.com",
            },
        },
        servers: [
            {
                url: "http://127.0.0.1:3001/warehouseManagement/v1",
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
    },
    apis: [
        "./src/auth/auth.routes.js", 
        "./src/client/client.routes.js",
    ],
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };
