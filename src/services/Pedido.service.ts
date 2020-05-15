import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { Pedido } from "../models/Pedido";
import { PedidoDAO } from "../dao/PedidoDAO";
import { validationResult } from "express-validator";
import { PedidoDTO } from "../value-objects/PedidoDTO";
import { ClienteDAO } from "../dao/ClienteDAO";
import { PedidoStatusEnum } from "../enums/PedidoStatusEnum";
import { ItemPedido } from "../models/ItemPedido";

export class PedidoService extends DefaultService<Pedido>{
    clienteDAO = new ClienteDAO();

    constructor() {
        super(new PedidoDAO());
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const pedidoDTO = req.body as PedidoDTO;
            const pedido: Pedido = Object.assign(new Pedido(), pedidoDTO);
            const cliente = await this.clienteDAO.findById(pedidoDTO.idCliente);
            if (!cliente) {
                throw 'Cliente não encontrado';
            }

            pedido.cliente = cliente;
            pedido.status = PedidoStatusEnum.PENDENTE;
            pedido.valorTotal = this.calcularValorTotal(pedidoDTO.itensPedido);
            return new DefaultResponse().success(res, await this.dao.save(pedido));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    update(req: Request, res: Response): Promise<DefaultResponse> {
        throw new Error("Method not implemented.");
    }

    private calcularValorTotal(itensPedido: ItemPedido[]) {
        return itensPedido.reduce((prev, cur) => prev += (cur.quantidade * cur.valor), 0)
    }
}