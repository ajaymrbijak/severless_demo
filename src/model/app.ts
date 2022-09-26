

import { Column, DataType, Model, Table } from "sequelize-typescript";


@Table({
    "tableName":"customers",
    "timestamps":false
})
class User extends Model{

@Column({
     type:DataType.INTEGER,
     primaryKey:true,
     autoIncrement:true,
    //  field:AppColumns.Id
})
id:number
@Column({
    type:DataType.STRING,
    // allowNull:false
    // field:AppColumns.First_Name
})
firstname:string
@Column({
    type:DataType.STRING,
    // field:AppColumns.Last_Name
})
lastname:string
@Column({
    type:DataType.STRING,
    // field:AppColumns.Email
})
email:string
@Column({
    type:DataType.INTEGER,
    // field:AppColumns.Mobile_Number
})
phone:number

}
export default User