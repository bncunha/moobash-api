import { IRoutes } from "./IRoutes";
import { Router } from "express";
import { ProdutoService } from "../services/Produto.service";
import { ProdutoValidator } from "../validators/ProdutoValidator";

export class ProdutoRoutes implements IRoutes {
    
    routes(): Router {
        const router = Router();
        const controller = new ProdutoService();
        router.get('/', controller.getPaginado.bind(controller));
        router.post('/', ProdutoValidator.create(), controller.create.bind(controller));
        router.put('/:id', ProdutoValidator.update(), controller.update.bind(controller));
        router.delete('/:id', controller.delete.bind(controller));
        return router;
    }
}