import { Router, Application } from "express";
import { ClienteRoutes } from "./Cliente.routes";
import { PedidoRoutes } from "./Pedido.routes";
import { PropriedadeSKURoutes } from "./PropriedadeSKU.routes";
import { OpcaoPropriedadeSKURoutes } from "./OpcaoPropriedadeSKU.routes";
import { ProdutoRoutes } from "./Produto.routes";


export class Routes {

    initRoutes(app: Application) {
        const clienteRoutes = new ClienteRoutes();
        const pedidoRoutes = new PedidoRoutes();
        const propriedadeSkuRoutes = new PropriedadeSKURoutes();
        const opcaoPropriedadeSkuRoutes = new OpcaoPropriedadeSKURoutes();
        const produtosRoutes = new ProdutoRoutes();
        app.use('/clientes', clienteRoutes.routes());
        app.use('/pedidos', pedidoRoutes.routes());
        app.use('/propriedades-sku', propriedadeSkuRoutes.routes());
        app.use('/opcoes-propriedades', opcaoPropriedadeSkuRoutes.routes());
        app.use('/produtos', produtosRoutes.routes());
    }
}