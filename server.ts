import bodyParser from 'body-parser';
import express, { Application, Router } from 'express';
import { Routes } from './src/routes/routes';
import { DataBaseConnection } from './src/dao/DatabaseConnection';
import 'reflect-metadata';

const app: Application = express();
app.use(express.json())


const routes = new Routes().initRoutes(app);
const databaseConecction = new DataBaseConnection().initConnection();


app.get('/teste', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('App is listening on port 3000!');
});