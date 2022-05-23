import express from "express";
import { connectToDatabase } from "./services/database.service";
import { movieRouter } from "./routes/movie.router";
import {authRouter} from "./routes/routerUsuario"
import dotenv from 'dotenv'; 
import cors from 'cors';
import morgan from "morgan";

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';


dotenv.config(); 
const app = express();


//Documentation
const swaggerOptions = {
        definition: {
            openapi: '3.0.0',
            info: {
            title: 'API REST TYPSCRIPT', 
            description: 'Esta es la documentación de la API en typscript-mongo con utentificacion de firebase, creada por Wilmara Ruiz como requisito del bootcamp de backend ', 
            contact: {
                name: 'Wilmara Ruiz Diaz', 
                email: 'wilmara_andreina93@hotmail.com'
            }, 
            servers: ['http://localhost:3040'], 
            version: '1.0'
        }
    }, 
    apis: [`./dist/docs/*.js`]
   
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.use(cors());
app.set('port',process.env.PORT||8080)
app.use(morgan('dev'));

connectToDatabase()
    .then(() => {
        // send all calls to /games to our gamesRouter
        app.use("/movies", movieRouter);
        app.use("/usuarios",authRouter)

        // start the Express server
        app.listen(app.get('port'), () => {
            console.log(`Server on port ${app.get('port')}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });

    
