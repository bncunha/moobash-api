import { PrimaryGeneratedColumn, Column, OneToMany, Entity } from "typeorm";
import { Sku } from "./Sku";

@Entity()
export class Produto {

    @PrimaryGeneratedColumn()
    idProduto: number;

    @Column({
        nullable: false,
    })
    nomeProduto: string;

    @Column()
    precoPadrao: number;

    @OneToMany(type=>Sku, sku => sku.produto, {
        cascade: true
    })
    skus: Sku[];
}