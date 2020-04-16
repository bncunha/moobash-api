import { body, param } from 'express-validator';

export class PedidoValidator {

    static create() {
        return [
            body(['idCliente', 'dataInicio', 'previsaoEntrega']).notEmpty(),
        ]
    }

    static update() {
        return PedidoValidator.create();
    }
}