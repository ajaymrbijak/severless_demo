import {Model, Column, DataType, Table } from "sequelize-typescript";
import User from "./app";

@Table
({
    tableName:'userposts',
    timestamps:true,
    freezeTableName:true
})

class UserPost extends Model{
    @Column({
      type:DataType.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      unique:true
    })
post_id:number
@Column({
    type:DataType.INTEGER,
    unique:true,
    references:{
        model:User,
        key:'id'
    }
})
user_id:number

@Column({
    type:DataType.STRING
})
user_post:string
}

export default UserPost;