
import { ModelCtor, Sequelize } from 'sequelize-typescript'
import DBPost from '../db_operation/post'
class DBManager{

async createDBConnection(model:any){
    
try{
    let dbConfig={
        "databasename":"product",
        "username":"postgres",
        "password":"1234",
        "host":"localhost",
        "port":5432,

    }
    const sequelize = new Sequelize({
  database: dbConfig.databasename,
  dialect: 'postgres',
  host: dbConfig.host,
  port:dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  storage: ':memory:',
  models: model 
});
//  saveDB(sequelize)
await sequelize.authenticate()
console.log("The DataBase Connection done successfull")
}

catch(e){
    console.log("Unable to connect with the database")
}
    }
    
}
export default DBManager;