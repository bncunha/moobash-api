import { DefaultDAO } from "./DefaultDAO"
import { Pedido } from "../models/Pedido";

export class PedidoDAO extends DefaultDAO<Pedido> {
    constructor() {
        super('Pedido');
    }
}