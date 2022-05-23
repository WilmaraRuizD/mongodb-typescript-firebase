import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { createValidator } from "express-joi-validation";
import{decodeToken}from "../firebase/marage_token"
import movieSchema from "../schemas-joi/movie_router"


export const movieRouter = express.Router();
const validator=createValidator({});

movieRouter.use(express.json());
//visualiza todas las peliculas requier TOKEN
movieRouter.get("/",decodeToken,async (_req: Request, res: Response) => {
    try {
       
        const movie = await collections.movie.find({}).toArray();

        res.status(200).send(movie);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


movieRouter.get("/:id",decodeToken,async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        // _id in MongoDB is an objectID type so we need to find our specific document by querying
        const query = { _id: new ObjectId(id) };
        const movie = await collections.movie.findOne(query);

        if (movie) {
            res.status(200).send(movie);
        }
    } catch (error) {
        res.status(404).send(`No se puede encontrar película: ${req.params.id}`);
    }
});
//crear nuevas peliculas requiere Token Y squema Joi
movieRouter.post("/",decodeToken,validator.body(movieSchema),async (req: Request, res: Response) => {
    try {
        const newMovie = req.body;
        const result = await collections.movie.insertOne(newMovie);

        result
            ? res.status(200).send(`Se crean película con id ${result.insertedId}`)
            : res.status(500).send(" Error en el servidor");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

//Actualizar peliculas por id requiere token y schema joi
movieRouter.put("/:_id",decodeToken,validator.body(movieSchema), async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedMovie = req.body;
        const query = { _id: new ObjectId(id) };
        
        const result = await collections.movie.updateOne(query, { $set: updatedMovie });

        result
            ? res.status(200).send(`Película actualizada exitosamente `)
            : res.status(304).send(`Película id: ${id} no actualizada`);
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
//Eliminar peliculas por id requiere Token
movieRouter.delete("/:id",decodeToken,async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.movie.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Se elimina id ${id} correctamente`);
        } else if (!result) {
            res.status(400).send(`Fallo al eliminar ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Película con ID ${id} no existe`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});