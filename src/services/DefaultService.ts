import { DefaultDAO } from "../dao/DefaultDAO";
import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { PropriedadeSKU } from "../models/PropriedadeSKU";

export abstract class DefaultService<Model> {

    dao: DefaultDAO<Model> | any extends DefaultDAO<Model> ? any : undefined;

    constructor(dao: DefaultDAO<Model> | any extends DefaultDAO<Model> ? any : undefined) {
        this.dao = dao;
    }

    abstract async create(req: Request, res: Response): Promise<DefaultResponse>;
    abstract async update(req: Request, res: Response): Promise<DefaultResponse>;

    async getPaginado(req: Request, res: Response) {
        try {
            const page = Number(req.query.page);
            const pageSize = Number(req.query.pageSize);
            return new DefaultResponse().success(res, await this.dao.getPaginado(page, pageSize))
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async findByID(req: Request, res: Response, relations?: string[]) {
        try {
            console.log(this.dao)
            return new DefaultResponse().success(res, await this.dao.findByID(req.params.id, relations))
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async delete(req: Request, res: Response) {
        try {
            return new DefaultResponse().success(res, await this.dao.deleteById(Number(req.params.id)));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }
}