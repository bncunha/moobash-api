import { body, param } from 'express-validator';
import { isNull } from 'util';

export class PropriedadeSKUValidator {

    static create() {
        return [
            body(['nomePropriedade']).notEmpty(),
            body(['codigoPropriedade']).optional({nullable: true}).isLength({max: 5, min: 2}),
        ]
    }

    static update() {
        return PropriedadeSKUValidator.create();
    }
}