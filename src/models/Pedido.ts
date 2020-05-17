import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Cliente } from "./Cliente";
import { ItemPedido } from "./ItemPedido";

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
    previsaoEntrega: Date;

    @Column({nullable: true})
    dataAtualizacao: Date;

    @Column({
        type: 'enum',
        enum: ['PENDENTE', 'PROCESSANDO', 'CANCELADO', 'CONCLUIDO']
    })
    status: string;

    @Column()
    valorTotal: number;

    @ManyToOne(type => Cliente, cliente => cliente.pedidos)
    cliente: Cliente;

    @OneToMany(type => ItemPedido, itemPedido => itemPedido.pedido, {
        cascade: true
    })
    itensPedido: ItemPedido[];
}