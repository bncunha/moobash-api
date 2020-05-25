import bodyParser from 'body-parser';
import express, { Application, Router } from 'express';
import { Routes } from './src/routes/routes';
import { DataBaseConnection } from './src/dao/DatabaseConnection';
import 'reflect-metadata';

require('dotenv').config({path: __dirname + '/environments/.env'});

const app: Application = express();
app.use(express.json())


const routes = new Routes().initRoutes(app);
const databaseConecction = new DataBaseConnection().initConnection();


app.get('/teste', (req, res) => {
    res.send('Hello World!');
});

app.listen(process.env.PORT || 8888, () => {
    console.log('App is listening on port: ' + (process.env.PORT || 8888));
});