import { createConnection, Connection } from "typeorm";

export class DataBaseConnection {

    async initConnection() {
        try {
            const res = await createConnection({
                url: process.env.JAWSDB_URL,
                type: "mysql",
                // host: "localhost",
                // port: 3306,
                // username: "root",
                // password: "123456",
                database: "pa2ul9jh0abo13ly",
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