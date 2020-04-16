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

    async getAll(req: Request, res: Response) {
        try {
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            return new DefaultResponse().success(res, await this.clienteDAO.getPaginado(page, pageSize))
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async create(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const clienteDTO: ClienteDTO = req.body;
            const cliente = Object.assign(new Cliente(), clienteDTO);
            return new DefaultResponse().success(res, await this.clienteDAO.save(cliente));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async update(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const clienteDTO: ClienteDTO = req.body;
            const cliente = Object.assign(await this.clienteDAO.findById(Number(req.params.id)), clienteDTO);
            return new DefaultResponse().success(res, await this.clienteDAO.save(cliente));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async delete(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            return new DefaultResponse().success(res, await this.clienteDAO.deleteById(Number(req.params.id)));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }
}