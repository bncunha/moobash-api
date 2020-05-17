import { Request, Response } from "express";
import { DefaultResponse } from "../value-objects/DefaultResponse";
import { DefaultService } from "./DefaultService";
import { validationResult } from "express-validator";
import { request } from "http";
import { Sku } from "../models/Sku";
import { SkuDAO } from "../dao/ProdutoDAO copy";
import { SkuDTO } from "../value-objects/SkuDTO";
import { OpcaoPropriedadeSKU } from "../models/OpcaoPropriedadeSKU";
import { OpcaoPropriedadeSKUDAO } from "../dao/OpcaoPropriedadeSKUDAO";
import { ProdutoDAO } from "../dao/ProdutoDAO";
import { Produto } from "../models/Produto";
import { CodigoUtils } from "../utils/CodigoUTils";

export class SkuService extends DefaultService<Sku>{

    opcaoDAO = new OpcaoPropriedadeSKUDAO();
    produtoDAO = new ProdutoDAO();

    constructor() {
        super(new SkuDAO());
    }

    async create(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            return await this.save(req, res, new Produto());
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async update(req: Request, res: Response): Promise<DefaultResponse> {
        try {
            const produto = await this.dao.findById(req.params.id);
            if (!produto) {
                throw 'Produto não encontrado!'
            }
            return await this.save(req, res, produto);
        } catch(err) {
            console.log(err);
            return new DefaultResponse().error(res, err);
        }
    }

    async save(req: Request, res: Response, p: Produto): Promise<DefaultResponse> {
        throw 'aa';
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return new DefaultResponse().invalidParams(res, errors.array());
        // }
        // // const produtoDTO = req.body as ProdutoDTO;
        // // produtoDTO.skus = produtoDTO.skus.map(sku => Object.assign(new Sku(), sku))
        // const produto = Object.assign(p, produtoDTO);

        // return new DefaultResponse().success(res, await this.dao.save(produto));
    }

    async parseSkudtoToSku(skuDTO: SkuDTO) {
        const sku = Object.assign(new Sku(), skuDTO) as Sku;
        const produto = await this.produtoDAO.findById(skuDTO.idProduto);
        if (!produto && skuDTO.idProduto) throw 'Produto não encontrado.';
        sku.opcoes = (await this.opcaoDAO.repository.findByIds(skuDTO.idOpcoes, {relations: ['propriedadeSKU']})).map(opcao => opcao) as OpcaoPropriedadeSKU[];
        sku.produto = produto;
        if (!sku.codigoSku) {
            sku.codigoSku = await this.gerarCodigoSKU(sku.opcoes, produto);
        }
        return sku;
    }

    async gerarCodigoSKU(opcoesSKU: OpcaoPropriedadeSKU[], produto?: Produto) {
        const getCodigoProduto = () => produto? produto.idProduto : '';
        const getCodigoOpcoes = () => {
            let codigoTexto = '';
            opcoesSKU.forEach((opc, index) => {
                codigoTexto += opc.propriedadeSKU.codigoPropriedade + opc.codigoOpcao + `${index == opcoesSKU.length-1 ? '': '-' }`
            });
            return codigoTexto;
        }

        let qtdCaracteres = 3;
        let codigoSKU = `P${getCodigoProduto()}-${CodigoUtils.gerarCodigoAleatorio(qtdCaracteres)}-${getCodigoOpcoes()}`;
        let codigoUnico = false;
        let tentativas = 0;
        while(!codigoUnico) {
            if (await this.dao.findByCodigoSKU(codigoSKU)) {
                tentativas++;
                codigoSKU = `P${getCodigoProduto()}-${CodigoUtils.gerarCodigoAleatorio(qtdCaracteres)}-${getCodigoOpcoes()}`;
            } else if (tentativas >= 10) {
                qtdCaracteres++;
                tentativas = 0;
            } else {
                codigoUnico = true;
            }
        }
        return codigoSKU;
    }

}