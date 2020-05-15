import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Pedido } from "./Pedido";

@Entity()
export class ItemPedido {

    @PrimaryGeneratedColumn()
    idItemPedido: number;

    @Column({
        nullable: false
    })
    quantidade: number;

    @Column({
        nullable: false
    })
    valor: number;

    @ManyToOne(type => Pedido, pedido => pedido.itensPedido)
    pedido: Pedido;
}