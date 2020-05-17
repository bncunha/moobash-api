import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, JoinTable } from "typeorm";
import { OpcaoPropriedadeSKU } from "./OpcaoPropriedadeSKU";
import { Produto } from "./Produto";

@Entity()
export class Sku {

    @PrimaryGeneratedColumn()
    idSku: number;

    @Column({
        nullable: false,
        unique: true
    })
    codigoSku: string;

    @Column({
        nullable: false
    })
    preco: number;

    @ManyToMany(type => OpcaoPropriedadeSKU)
    @JoinTable()
    opcoes: OpcaoPropriedadeSKU[];

    @ManyToOne(type=>Produto, prod => prod.skus)
    produto: Produto;
}