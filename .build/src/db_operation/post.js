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
const db_manager_1 = require("../db_manager/db_manager");
const app_1 = require("../model/app");
class DBPost {
    insertionPost() {
        return __awaiter(this, void 0, void 0, function* () {
            //     var client=sequelize.define(,
            //     {
            //         First_Name:DataType.STRING,
            //         Last_Name:DataType.STRING,
            //         Email:DataType.STRING,
            //         Mobie_Number:DataType.STRING
            //     }
            //     );
            //     client.sync();
            // var client=User.init(
            //     {
            //         "First_Name":DataType.STRING,
            //         "Last_Name":DataType.STRING,
            //         "Email":DataType.STRING,
            //         "Mobie_Number":DataType.STRING
            //     },
            //     { sequelize, timestamps: false }
            //     );
            try {
                let dbManager = new db_manager_1.default();
                yield dbManager.createDBConnection([app_1.default]);
                // const person = await User.create({First_Name: 'Akram', Last_Name:'Rathod',Email:'karam@gmail.com',Mobile_Number:7934591609 })
                const count = yield app_1.default.destroy({ where: { id: 4 } });
                console.log(`deleted row(s): ${count}`);
                // if(person==null){
                //     return {
                //         "status-code":400,
                //         "msg":"Data cannot be created "
                //     }
                // }
                // return  {
                //     "status-code":200,
                //     "msg":"Data  created  Successfully"
                // }
            }
            catch (e) {
                console.log("Unable to perform Operations");
            }
        });
    }
}
exports.default = DBPost;
//# sourceMappingURL=post.js.map