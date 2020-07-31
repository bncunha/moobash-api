import * as HttpStatus from 'http-status-codes'
import { Request, Response} from 'express';
import { json } from 'body-parser'

export type ErroResponse = {
    erroCode: number;
    message: string;
}

export class DefaultResponse {

    success(res: Response, jsonData: any) {
        res.status(HttpStatus.OK).json(jsonData);
        return this;
    }

    error(res: Response, error: any) {
        res.status(HttpStatus.BAD_REQUEST).json(this.getMensagemErro(error));
        return this;
    }

    invalidParams(res: Response, errors: any) {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(errors);
        return this;
    }

    private getMensagemErro(error: any) {
        const response = {erroCode: error.errno} as ErroResponse;
        switch(error.errno) {
            case 1062: response.message = 'Esta informação já está cadastrada!'; break;
        }
        return response;
    }
}