import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { validationResult } from "express-validator";
import { PropriedadeSKUDAO } from "../dao/PropriedadeSKUDAO";
import { PropriedadeSKU } from "../models/PropriedadeSKU";
import { CodigoUtils } from "../utils/CodigoUTils";

export class PropriedadeSKUService extends DefaultService<PropriedadeSKU>{

    constructor() {
        super(new PropriedadeSKUDAO());
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            return this.save(req, res, new PropriedadeSKU());
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async update(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            const propriedade = await this.dao.findById(req.params.id);
            if (!propriedade) {
                throw 'Propriedade não encontrada!';
            }
            return this.save(req, res, propriedade);
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }    
    }

    private async save(req: Request, res: Response, propriedadeSku: PropriedadeSKU) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const propriedadeDTO = req.body as PropriedadeSKUDAO;
            const propriedadeSKU: PropriedadeSKU = Object.assign(propriedadeSku, propriedadeDTO);

            if (!propriedadeSKU.codigoPropriedade) {
                propriedadeSKU.codigoPropriedade = await CodigoUtils.gerarCodigoUnico(propriedadeSKU.nomePropriedade, this.dao.findByCodigoPropriedade.bind(this.dao));
            }
            return new DefaultResponse().success(res, await this.dao.save(propriedadeSKU));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }
}