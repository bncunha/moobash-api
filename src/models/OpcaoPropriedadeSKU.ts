import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { PropriedadeSKU } from "./PropriedadeSKU";

@Entity()
export class OpcaoPropriedadeSKU {
    @PrimaryGeneratedColumn()
    idOpcaoPropriedadeSKU: number;

    @Column({
        nullable: false,
        unique: true
    })
    nomeOpcao: string;

    @Column({
        nullable: false,
        unique: true
    })
    codigoOpcao: string;

    @ManyToOne(type => PropriedadeSKU, prop => prop.opcoes, {
        nullable: false
    })
    propriedadeSKU: PropriedadeSKU;
}