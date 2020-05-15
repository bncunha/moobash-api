import { body, param } from 'express-validator';

export class PropriedadeSKUValidator {

    static create() {
        return [
            body(['nomePropriedade']).notEmpty(),
            body(['codigoPropriedade']).isLength({max: 5}),
        ]
    }

    static update() {
        return PropriedadeSKUValidator.create();
    }
}