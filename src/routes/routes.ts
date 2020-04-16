import { Router, Application } from "express";
import { ClienteRoutes } from "./Cliente.routes";
import { PedidoRoutes } from "./Pedido.routes";


export class Routes {

    initRoutes(app: Application) {
        const clienteRoutes = new ClienteRoutes();
        const pedidoRoutes = new PedidoRoutes();
        app.use('/clientes', clienteRoutes.routes());
        app.use('/pedidos', pedidoRoutes.routes());
    }
}