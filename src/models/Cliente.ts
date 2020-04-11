import {Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import { Pedido } from "./Pedido";

@Entity()
export class Cliente {

    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column()
    nome: string;

    @Column({
        nullable: true
    })
    telefone: string;

    @Column({nullable: true})
    whatsapp: string;

    @Column({nullable: true})
    email: string;

    @Column({nullable: true})
    endereco: string;

    @OneToMany(type => Pedido, pedido => pedido.cliente)
    pedidos: Pedido[];
}