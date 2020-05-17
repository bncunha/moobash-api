import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { validationResult } from "express-validator";
import { Produto } from "../models/Produto";
import { ProdutoDAO } from "../dao/ProdutoDAO";
import { ProdutoDTO } from "../value-objects/ProdutoDTO";
import { request } from "http";
import { Sku } from "../models/Sku";
import { SkuService } from "./Sku.service";

export class ProdutoService extends DefaultService<Produto>{

    skuService = new SkuService();

    constructor() {
        super(new ProdutoDAO());
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const produtoDTO = req.body as ProdutoDTO;
            const produto = Object.assign(new Produto(), produtoDTO) as Produto;
            produto.skus = [];
            if (produtoDTO.skus) {
                for (let skuDTO of produtoDTO.skus) {
                    produto.skus.push(await this.skuService.parseSkudtoToSku(skuDTO));
                }
            }
            return new DefaultResponse().success(res, await this.dao.save(produto));

        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async update(req: Request, res: Response): Promise<DefaultResponse> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return new DefaultResponse().invalidParams(res, errors.array());
        }
        try {
            const produtoFidded = await this.dao.findById(req.params.id);
            if (!produtoFidded) {
                throw 'Produto não encontrado!'
            }
            const produto = Object.assign(produtoFidded, req.body);
            return new DefaultResponse().success(res, await this.dao.save(produto));
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }
}