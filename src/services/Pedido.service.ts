import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { Pedido } from "../models/Pedido";
import { PedidoDAO } from "../dao/PedidoDAO";

export class PedidoService extends DefaultService<Pedido>{
    
    constructor() {
        super(new PedidoDAO());
    }

    create(req: Request, res: Response): Promise<DefaultResponse> {
        throw new Error("Method not implemented.");
    }

    update(req: Request, res: Response): Promise<DefaultResponse> {
        throw new Error("Method not implemented.");
    }
}