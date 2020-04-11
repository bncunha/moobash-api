import { Request, Response} from 'express';
import { ClienteDTO } from '../value-objects/ClienteDTO';
import { DefaultResponse } from '../value-objects/DefaultResponse';
import { validationResult } from 'express-validator';
import * as HttpStatus from 'http-status-codes'
import { ClienteDAO } from '../dao/ClienteDAO';
import { Cliente } from '../models/Cliente';


export class ClienteService {

    clienteDAO = new ClienteDAO();

    constructor() {}

    getAll(req: Request, res: Response) {
        res.send('Lalalala');
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }

        try {
            const clienteDTO: ClienteDTO = req.body;
            const cliente = Object.assign(new Cliente(), clienteDTO);
            return new DefaultResponse().success(res, await this.clienteDAO.create(cliente));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }

    }
}