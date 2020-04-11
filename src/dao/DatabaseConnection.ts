import { createConnection, Connection } from "typeorm";

export class DataBaseConnection {

    async initConnection() {
        try {
            const res = await createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "123456",
                database: "bek_system_dev",
                entities: [
                    __dirname + "./../models/*.js"
                ],
                synchronize: true,
            });
            console.log('Conection Succesfully')
        } catch(err) {
            console.log(err);
            return err;
        }
    }
}