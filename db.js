import {MongoClient} from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const mongoClient =  new MongoClient(process.env.MONGO_URI);
await mongoClient.connect();

const db = mongoClient.db("yogapp_db");

export default db;
//consigo exportar funcao, variavel, objeto, array, etc...
