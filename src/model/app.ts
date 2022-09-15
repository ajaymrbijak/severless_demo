

import { Column, DataType, Model, Table } from "sequelize-typescript";
// import AppColumns from "./app_columns";

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
Id:number
@Column({
    type:DataType.STRING,
    // field:AppColumns.First_Name
})
First_Name:string
@Column({
    type:DataType.STRING,
    // field:AppColumns.Last_Name
})
Last_Name:string
@Column({
    type:DataType.STRING,
    // field:AppColumns.Email
})
Email:string
@Column({
    type:DataType.INTEGER,
    // field:AppColumns.Mobile_Number
})
Mobile_Number:number

}
export default User