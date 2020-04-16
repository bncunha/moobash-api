import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { PedidoService } from "../services/Pedido.service";
import { PedidoValidator } from "../validators/PedidoValidator";

export class PedidoRoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new PedidoService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', PedidoValidator.create(), controller.create.bind(controller));
        // router.put('/:id', ClienteValidator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}