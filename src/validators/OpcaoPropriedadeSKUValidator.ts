import { body, param } from 'express-validator';

export class OpcaoPropriedadeSKUValidator {

    static create() {
        return [
            body(['nomeOpcao']).notEmpty(),
            body(['codigoOpcao']).isLength({max: 5}),
            body(['idPropriedadeSKU']).notEmpty(),
        ]
    }

    static update() {
        return OpcaoPropriedadeSKUValidator.create();
    }
}