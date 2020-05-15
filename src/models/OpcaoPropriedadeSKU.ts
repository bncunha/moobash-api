import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { PropriedadeSKU } from "./PropriedadeSKU";

@Entity()
export class OpcaoPropriedadeSKU {
    @PrimaryGeneratedColumn()
    idOpcaoPropriedadeSKU: number;

    @Column({
        nullable: false
    })
    nomeOpcao: string;

    @Column({
        nullable: false
    })
    codigoOpcao: string;

    @OneToMany(type => PropriedadeSKU, prop => prop.opcoes)
    propriedadeSKU: PropriedadeSKU;
}