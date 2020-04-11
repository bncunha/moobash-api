import { Router, Application } from "express";
import { ClienteRoutes } from "./Cliente.routes";

const router = Router();

export class Routes {

    initRoutes(app: Application) {
        const clienteRoutes = new ClienteRoutes();
        app.use('/clientes', clienteRoutes.routes(router));
    }
}