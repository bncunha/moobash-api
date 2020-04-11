import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Cliente } from "./Cliente";

@Entity()
export class Pedido {

    @PrimaryGeneratedColumn()
    idPedido: number;

    @Column({
        nullable: false
    })
    dataInicio: Date;

    @Column({nullable: true})
    dataFinal: Date;

    @Column({nullable: true})
    dataAtualizacao: Date;

    @Column()
    status: string;

    @Column()
    valorTotal: number;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    cliente: Cliente;
}