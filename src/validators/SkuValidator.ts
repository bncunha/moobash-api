import { body, param } from 'express-validator';

export class SkuValitator {

    static create() {
        return [
            body('idProduto').notEmpty(),
            body('preco').isLength({min: 0}),
            body('idOpcoes').isLength({min: 0}),
        ]
    }

    static update() {
        return SkuValitator.create();
    }
}