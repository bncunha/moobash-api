import { DefaultDAO } from "./DefaultDAO";
import { OpcaoPropriedadeSKU } from "../models/OpcaoPropriedadeSKU";

export class OpcaoPropriedadeSKUDAO extends DefaultDAO<OpcaoPropriedadeSKU> {
    constructor() {
        super('OpcaoPropriedadeSKU');
    }

    async findByCodigoOpcaoPropriedade(codigoProp: string): Promise<OpcaoPropriedadeSKU> {
        const finded = await this.repository.findOne({
            where: {
                codigoOpcao: codigoProp
            }
        }) as OpcaoPropriedadeSKU;
        return finded;
    }

    async findByPropriedadeID(propriedadeID: string): Promise<OpcaoPropriedadeSKU[]> {
        const finded = await this.repository.find({
            where: {
                propriedadeSKU: propriedadeID
            }
        }) as OpcaoPropriedadeSKU[];
        return finded;
    }
}