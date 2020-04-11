import { body } from 'express-validator';

export class ClienteValidator {

    static create() {
        return [
            body('nome').notEmpty(),
            body('telefone').isLength({min: 8, max: 9}),
            body('whatsapp').isLength({min: 8, max: 9}),
            body('email').isEmail()
        ]
    }
}