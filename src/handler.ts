import { APIGatewayProxyEvent } from "aws-lambda";
import { Response } from "aws-sdk";
import DBManager from "./db_manager/db_manager";
import Responses from "./db_manager/response_connection";
import User from "./model/app";

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

// export   async function postUsers(){

// try{
//     let dbManager=new DBManager();
//         await dbManager.createDBConnection([User])
//          const person = await User.create({First_Name: 'Akram', Last_Name:'Rathod',Email:'karam@gmail.com',Mobile_Number:7934591609 })
// if(person==null){
//     return {
//         "status-code":400,
//         "msg":"Data cannot be created "
//     }
// }
// return console.log(person)
// }
// catch(e){
//     console.log("Unable to perform Operations")
// }

// }

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
    // let body = event.body;
    if (typeof event.body === "string") {
     let body = JSON.parse(event.body);
     console.log(body);
    }
   
    const data = {
      First_Name: event.body["firstname"],
      Last_Name: event.body["lastname"],
      Email: event.body["email"],
      Mobile_Number: event.body["mobilenumber"],
    };
    const post = await User.create(data);
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
        body: {
          data: "",
          msg: "Please Pass the required queryParameters [id]",
        },
      };
    }
    let deletePost = await User.destroy({
      where: { Id: event.queryStringParameters.Id },
    });
    console.log(deletePost);
    return Responses.successCode(deletePost);
  } catch (error) {
    console.log(error);
    return Responses.failureCode();
  }
}

export async function updateUser(event: APIGatewayProxyEvent) {
  try {
    let db_manager = new DBManager();
    await db_manager.createDBConnection([User]);
    if (
      event.queryStringParameters == null ||
      event.queryStringParameters.Id == null
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
    let update = await User.update(
      {
        First_Name: "modified",
        Last_Name: "updated",
        Email: "update@gmail.com",
        Mobile_Number: +9983424492,
      },
      { where: { Id: event.queryStringParameters.Id } }
    );
    if (update == null) {
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
        data: "",
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
