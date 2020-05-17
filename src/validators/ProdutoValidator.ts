import { body, param } from 'express-validator';
import { Request } from 'express';

export class ProdutoValidator {

    static create() {
        return [
            body('nomeProduto').notEmpty(),
            body('precoPadrao').isFloat({gt: 0})
        ]
    }

    static update() {
        return ProdutoValidator.create();
    }
}