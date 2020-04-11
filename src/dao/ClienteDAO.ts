import { Cliente } from "../models/Cliente";
import { getConnection } from "typeorm";

export class ClienteDAO {

    async create(cliente: Cliente) {
        return await getConnection().manager.save(cliente);
    }
}