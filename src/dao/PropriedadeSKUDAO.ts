import { Cliente } from "../models/Cliente";
import { DefaultDAO } from "./DefaultDAO";
import { PropriedadeSKU } from "../models/PropriedadeSKU";

export class PropriedadeSKUDAO extends DefaultDAO<PropriedadeSKU> {
    constructor() {
        super('PropriedadeSKU');
    }

    async findByCodigoPropriedade(codigoProp: string): Promise<PropriedadeSKU> {
        const finded = await this.repository.findOne({
            where: {
                codigoPropriedade: codigoProp
            }
        }) as PropriedadeSKU;
        return finded;
    }
}