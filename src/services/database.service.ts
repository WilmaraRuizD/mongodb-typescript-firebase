import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import movie from "../models/movie";

export const collections: { movie?: mongoDB.Collection<movie> } = {};

export const connectToDatabase=async ()=> {
    // Pulls in the .env file so it can be accessed from process.env. No path as .env is in root, the default location
    dotenv.config();

    // Create a new MongoDB client with the connection string from .env
    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    // Connect to the cluster
    await client.connect();

    // Connect to the database with the name specified in .env
    const db = client.db(process.env.DB_NAME);
    
    // Apply schema validation to the collection
    //await applySchemaValidation(db);

    // Connect to the collection with the specific name from .env, found in the database previously specified
    const movieCollection = db.collection<movie>(process.env.MOVIES_COLLECTION_NAME);

  
    collections.movie = movieCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${movieCollection.collectionName}`,
    );
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Game model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
// const applySchemaValidation=async (db: mongoDB.Db)=> {
//     const jsonSchema = {
//         $jsonSchema: {
//             bsonType: "object",
//             required: ["adult", "original_title", "original_language"],
//             additionalProperties: false,
//             properties: {
//                 _id: {},
//                 adult: {
//                     bsonType: "boolean",
//                     description: "'titulo' is required and is a string",
//                 },
//                 backdrop_path: {
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 }, 
//                 genre_ids:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 original_language:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 original_title:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 overview:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 popularity:{
//                     bsonType: "number",
//                     description: "'Year' is required and is a number",
//                 },
//                 poster_path:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 release_date:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 title:{
//                     bsonType: "string",
//                     description: "'Year' is required and is a number",
//                 },
//                 video:{
//                     bsonType: "boolean",
//                     description: "'Year' is required and is a number",
//                 },
//                 vote_average:{
//                     bsonType: "boolean",
//                     description: "'Year' is required and is a number",
//                 },
//                 vote_count:{
//                     bsonType: "number",
//                     description: "'Year' is required and is a number",
//                 }
                
//             }
//         }
//     }

//     // Try applying the modification to the collection, if the collection doesn't exist, create it 
//    await db.command({
//         collMod: process.env.MOVIES_COLLECTION_NAME,
//         validator: jsonSchema
//     }).catch(async (error: mongoDB.MongoServerError) => {
//         if (error.codeName === 'NamespaceNotFound') {
//             await db.createCollection(process.env.MOVIES_COLLECTION_NAME, {validator: jsonSchema});
//         }
//     });
// }
