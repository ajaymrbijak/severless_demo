"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
class DBManager {
    createDBConnection(model) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dbConfig = {
                    "databasename": "product",
                    "username": "postgres",
                    "password": "1234",
                    "host": "localhost",
                    "port": 5432,
                };
                const sequelize = new sequelize_typescript_1.Sequelize({
                    database: dbConfig.databasename,
                    dialect: 'postgres',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    storage: ':memory:',
                    models: model
                });
                //  saveDB(sequelize)
                yield sequelize.authenticate();
                console.log("The DataBase Connection done successfull");
            }
            catch (e) {
                console.log("Unable to connect with the database");
            }
        });
    }
}
exports.default = DBManager;
//# sourceMappingURL=db_manager.js.map