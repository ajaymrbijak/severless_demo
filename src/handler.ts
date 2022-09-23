import { APIGatewayProxyEvent } from "aws-lambda";
import { Response } from "aws-sdk";
import DBManager from "./db_manager/db_manager";
import Responses from "./db_manager/response_connection";
import User from "./model/app";
import UserPost from "./model/user_post";

export async function getUsers(event: APIGatewayProxyEvent) {
  let dbManager = new DBManager();
  await dbManager.createDBConnection([User]);

  let userInfo = await User.findAll();
  let resp: any = [];

  for (let i = 0; i < userInfo.length; i++) {
    let obj = {
      id: userInfo[i].Id,
      first_name: userInfo[i].First_Name,
      last_name: userInfo[i].Last_Name,
      email: userInfo[i].Email,
      mobile_number: userInfo[i].Mobile_Number,
    };
    resp.push(obj);
  }
  console.log(event);
  return {
    statusCode: "200",
    headers: {
      "Acces-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      data: resp,
      developer_message: "You are Successfully login into the Jupiter",
      response_code: "80",
    }),
  };
}

export async function postUserResp(event: APIGatewayProxyEvent) {
  try {
    let dbManager = new DBManager();
    await dbManager.createDBConnection([User]);
   
    if (event == null || event.body == null) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: {
          msg: "Data to be pass",
          data: "",
        },
      };
    }
    console.log(event.toString())
   // console.log(event.body.toString)
    let body = event.body;
    if (typeof event.body === "string") {
     body = JSON.parse(event.body);
     console.log(body);
    }
   
    const data = {
      First_Name: body["First_Name"],
      Last_Name: body["Last_Name"],
      Email: body["Email"],
      Mobile_Number: body["Mobile_Number"],
    };
   console.log(data.toString())
    const post = await User.create(data);
    console.log(post.toString())
    let response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        data: post,
        msg: "Data created successfully",
      }),
    };
    return response;
  } catch (error) {
    console.log(error);
    let response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        msg: "Internal Server Error EXCEPTION",
        data: "",
      }),
    };
    return response;
  }
}

export async function deleteUserResp(event: APIGatewayProxyEvent) {
  try {
    let dbManger = new DBManager();
    await dbManger.createDBConnection([User]);

    if (event.queryStringParameters == null) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body:JSON.stringify( {
          data: "",
          msg: "Please Pass the required queryParameters [id]",
        },
      )};
    }
// let bodydata=event.body
// if(bodydata==null){
//   return console.log("Delete  Id Must to be passed")
// }
    let deletepost= event.queryStringParameters;
    if (typeof event.body === "string") {
      deletepost = JSON.parse(event.body);
     console.log(deletepost);
    }
   if(deletepost==null)
   {
return{
  "statusCode":404,
  "body":{
    "data":"",
    "error":"Delete iD must to be pass"}
}
   }
    const data = {
            Id:deletepost['Id']
    };

    let deletePost = await User.destroy({
      where: { data },
    });
    // console.log(deletePost);
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        data: deletePost,
        msg: "Post deleted successfully",
      }),
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
    };
    return response;
  }
}

export async function updateUser(event: APIGatewayProxyEvent) {
  try {
    let db_manager = new DBManager();
    await db_manager.createDBConnection([User]);
    if (
      event.multiValueQueryStringParameters== null ||
      event.multiValueQueryStringParameters.Id == null 
    ) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          data: "",
          msg: "Please pass the required parameter [id] to update data",
        }),
      };
    }
    let updatePost= await User.update(
      {
        First_Name: `${event.multiValueQueryStringParameters.First_Name}`,
        Last_Name: `${event.multiValueQueryStringParameters.Last_Name}`,
        Email: `${event.multiValueQueryStringParameters.Email}`,
        Mobile_Number: event.multiValueQueryStringParameters.Mobile_Number,
      },
      { where: { Id: event.multiValueQueryStringParameters.Id } }
    );
    console.log(updatePost)
    if (updatePost == null) {
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          msg: "Post Doesn't exist for this id",
          data: "",
        }),
      };
    }
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        msg: "Updated data successfully..",
        data: ` The Affect rows are : ${updatePost.toString()}`,
      }),
    };
  } catch (e) {
    console.log(e);
    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
    };
    return response;
  }
}

export async function getUserViaId(event: APIGatewayProxyEvent) {
  try {
    let db = new DBManager();
    await db.createDBConnection([User]);
    if (event.queryStringParameters == null) {
      return {
        statusCode: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({
          data: "you need to pass required parameter [id]",
        }),
      };
    }
    let posts = await User.findOne({
      raw: true,
      where: {
        Id: event.queryStringParameters.Id,
      },
    });

    console.log(JSON.stringify(event.queryStringParameters.Id));
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({
        data: posts,
      }),
    };
    return response;
  } catch (error) {
    console.log(error);
    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ msg: "Internal Server Error", data: "" }),
    };
    return response;
  }
}
