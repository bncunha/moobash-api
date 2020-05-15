import { Router, Application } from "express";
import { ClienteRoutes } from "./Cliente.routes";
import { PedidoRoutes } from "./Pedido.routes";
import { PropriedadeSKURoutes } from "./PropriedadeSKU.routes";


export class Routes {

    initRoutes(app: Application) {
        const clienteRoutes = new ClienteRoutes();
        const pedidoRoutes = new PedidoRoutes();
        const propriedadeSkuRoutes = new PropriedadeSKURoutes();
        app.use('/clientes', clienteRoutes.routes());
        app.use('/pedidos', pedidoRoutes.routes());
        app.use('/propriedades-sku', propriedadeSkuRoutes.routes());
    }
}