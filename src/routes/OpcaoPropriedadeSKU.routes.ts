import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { OpcaoPropriedadeSKUService } from "../services/OpcaoPropriedadeSKU.service";
import { OpcaoPropriedadeSKUValidator } from "../validators/OpcaoPropriedadeSKUValidator";

export class OpcaoPropriedadeSKURoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new OpcaoPropriedadeSKUService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', OpcaoPropriedadeSKUValidator.create(), controller.create.bind(controller));
        router.put('/:id', OpcaoPropriedadeSKUValidator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}