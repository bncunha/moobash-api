import { DefaultDAO } from "./DefaultDAO";
import { Sku } from "../models/Sku";

export class SkuDAO extends DefaultDAO<Sku> {
    constructor() {
        super('Sku');
    }

    async findByCodigoSKU(codigoSKU: string): Promise<Sku> {
        const sku = (await this.repository.find({
            where: {
                codigoSku: codigoSKU
            }
        }))[0] as Sku;
        return sku;
    }
}