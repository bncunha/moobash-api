import { createConnection, Connection } from "typeorm";

export class DataBaseConnection {
    con: any;

    async initConnection() {
        if (process.env.NODE_ENV == 'production') {
            this.con = {
                url: process.env.JAWSDB_URL,
                type: "mysql",
                database: process.env.JAWSDB_DATABSE,
                entities: [
                    __dirname + "./../models/*.js"
                ],
                synchronize: true,
            }
        } else {
            this.con = {
                type: "mysql",
                host: process.env.DATABASE_HOST,
                port: process.env.DATABASE_PORT,
                username: process.env.DATABASE_USERNAME,
                password: process.env.DATABASE_PASSWORD,
                database: process.env.DATABASE_DATABASE,
                entities: [
                    __dirname + "./../models/*.js"
                ],
                synchronize: true,
            }
        }
        try {
            const res = await createConnection(this.con);
            console.log('Conection Succesfully')
        } catch(err) {
            console.log(err);
            return err;
        }
    }
}