import { DefaultDAO } from "./DefaultDAO";
import { Produto } from "../models/Produto";

export class ProdutoDAO extends DefaultDAO<Produto> {
    constructor() {
        super('Produto');
    }
}