import { DataType, Sequelize } from "sequelize-typescript";
import { Json } from "sequelize/types/utils";
import DBManager from "../db_manager/db_manager";
import User from "../model/app";


class DBPost{
     async insertionPost(){
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

try{
    let dbManager=new DBManager();
        await dbManager.createDBConnection([User])
        // const person = await User.create({First_Name: 'Akram', Last_Name:'Rathod',Email:'karam@gmail.com',Mobile_Number:7934591609 })
        const count = await User.destroy({ where: { id: 4 } });
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
catch(e){
    console.log("Unable to perform Operations")
}
        
    }
}
export default DBPost;