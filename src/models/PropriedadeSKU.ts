import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { OpcaoPropriedadeSKU } from "./OpcaoPropriedadeSKU";

@Entity()
export class PropriedadeSKU {
    @PrimaryGeneratedColumn()
    idPropriedadeSKU: number;

    @Column({
        nullable: false
    })
    nomePropriedade: string;

    @Column({
        nullable: false,
        length: 5,
        unique: true
    })
    codigoPropriedade: string;

    @OneToMany(type => OpcaoPropriedadeSKU, opc => opc.propriedadeSKU)
    opcoes: OpcaoPropriedadeSKU;
}