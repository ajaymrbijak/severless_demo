
import { ModelCtor, Sequelize } from 'sequelize-typescript'
class DBManager{

async createDBConnection(model1:ModelCtor[]){
    
try{
    let dbConfig={
        // "databasename":"product",
        // "username":"postgres",
        // "password":"1234",
        // "host":"localhost",
        // "port":5432,
         "databasename":"jiomart_db",
        "username":"postgres",
        "password":"12345678",
        "host":"jiomartdb.cxufopfx4q8i.ap-south-1.rds.amazonaws.com",
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
  models: model1
});
//  saveDB(sequelize)
await sequelize.authenticate()
console.log("The DataBase Connection done successfull")
}

catch(e){
    console.log(e.toString())
    console.log("Unable to connect with the database")
}
    }
    
}
export default DBManager;