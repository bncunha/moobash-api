import { SkuDTO } from "./SkuDTO";

export type ProdutoDTO = {
    nomeProduto: string;
    precoPadrao: number;
    skus: SkuDTO[];
}