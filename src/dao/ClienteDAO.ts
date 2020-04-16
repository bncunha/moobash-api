import { Cliente } from "../models/Cliente";
import { getConnection } from "typeorm";
import { get } from "https";
import { DefaultDAO } from "./DefaultDAO";

export class ClienteDAO extends DefaultDAO<Cliente> {
    constructor() {
        super('Cliente');
    }
}