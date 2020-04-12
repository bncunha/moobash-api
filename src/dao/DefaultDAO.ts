import { getRepository, Repository } from "typeorm";

export class DefaultDAO<Model> {
    
    modelString: string;

    constructor(modelString: string) {
        this.modelString = modelString;
    }
    

    async save(model: Model) {
        return this.repository.save(model);
    }

    async getPaginado(page: number, pageSize: number) {
        const itens = await this.repository.find({
            take: pageSize,
            skip: page-1
        });

        const total = await this.repository.count();
        return {itens: itens, total: total, page: page};
    }

    async findById(id: number): Promise<Model> {
        const finded = await this.repository.findByIds([id]) as Model[];
        return finded ? finded[0] : null;
    } 

    get repository() {
        return getRepository(this.modelString)
    }
}