import { Router } from "express";
import { IRoutes } from "./IRoutes";
import { ClienteService } from "../services/Cliente.service";
import { ClienteValidator } from "../validators/ClienteValidator";
import { check, body, param } from "express-validator";

export class ClienteRoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new ClienteService();
        router.get('/', controller.getAll.bind(controller));
        router.post('/', ClienteValidator.create(), controller.create.bind(controller));
        router.put('/:id', ClienteValidator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}