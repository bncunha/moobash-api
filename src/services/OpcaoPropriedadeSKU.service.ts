import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { validationResult } from "express-validator";
import { CodigoUtils } from "../utils/CodigoUTils";
import { OpcaoPropriedadeSKU } from "../models/OpcaoPropriedadeSKU";
import { OpcaoPropriedadeSKUDAO } from "../dao/OpcaoPropriedadeSKUDAO";
import { OpcaoPropriedadeSKUDTO } from "../value-objects/OpcaoPropriedadeSKUDTO";
import { PropriedadeSKUDAO } from "../dao/PropriedadeSKUDAO";
import { PropriedadeSKU } from "../models/PropriedadeSKU";

export class OpcaoPropriedadeSKUService extends DefaultService<OpcaoPropriedadeSKU>{

    propriedadeSKUDAO = new PropriedadeSKUDAO();
    constructor() {
        super(new OpcaoPropriedadeSKUDAO());
    }

    async getOpcoesByPropriedadeSku(req: Request, res: Response) {
        try {
            const idPropriedadeSku = req.params.idPropriedadeSKU;
            return new DefaultResponse().success(res, await this.dao.findByPropriedadeID(idPropriedadeSku));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            return this.save(req, res, new OpcaoPropriedadeSKU());
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async update(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            const opcaoPropriedade = await this.dao.findById(req.params.id);
            if (!opcaoPropriedade) {
                throw 'Propriedade não encontrada!';
            }
            return this.save(req, res, opcaoPropriedade);
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }    
    }

    private async save(req: Request, res: Response, opcaoPropriedadeSku: OpcaoPropriedadeSKU) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const opcaoPropriedadeDTO = req.body as OpcaoPropriedadeSKUDTO;
            const opcaoPropriedadeSKU: OpcaoPropriedadeSKU = Object.assign(opcaoPropriedadeSku, opcaoPropriedadeDTO);
            const propriedadeSKU: PropriedadeSKU = await this.propriedadeSKUDAO.findById(opcaoPropriedadeDTO.idPropriedadeSKU as any);

            if (!propriedadeSKU) {
                throw 'Propriedade sku não encontrada!';
            }

            if (!opcaoPropriedadeSKU.codigoOpcao) {
                opcaoPropriedadeSKU.codigoOpcao = await CodigoUtils.gerarCodigoUnico(opcaoPropriedadeSKU.nomeOpcao, this.dao.findByCodigoOpcaoPropriedade.bind(this.dao));
            }
            opcaoPropriedadeSKU.propriedadeSKU = propriedadeSKU;
            return new DefaultResponse().success(res, await this.dao.save(opcaoPropriedadeSKU));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }
}