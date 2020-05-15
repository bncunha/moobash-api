import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { PropriedadeSKUValidator } from "../validators/PropriedadeSKUValidator";
import { PropriedadeSKUService } from "../services/PropriedadeSKU.service";

export class PropriedadeSKURoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new PropriedadeSKUService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', PropriedadeSKUValidator.create(), controller.create.bind(controller));
        router.put('/:id', PropriedadeSKUValidator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}