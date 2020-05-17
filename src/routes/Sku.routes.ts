import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { SkuService } from "../services/Sku.service";
import { SkuValitator } from "../validators/SkuValidator";

export class SkuRoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new SkuService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', SkuValitator.create(), controller.create.bind(controller));
        router.put('/:id', SkuValitator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}