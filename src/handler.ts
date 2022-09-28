import { APIGatewayProxyEvent } from "aws-lambda";
import DBManager from "./db_manager/db_manager";
import { default as axios } from 'axios';
import User from "./model/app";
// import https = require('https');
// import axios = require("axios");
import { resolve } from "path";
import { rejects } from "assert";
// import { APIGatewayProxyEvent } from '/Users/bindureddykr/Desktop/Aws_Serverless_Demo_Code/nodejs/node_modules/@types/aws-lambda/index';
export async function getUsers(event: APIGatewayProxyEvent) {
  let dbManager = new DBManager();
  await dbManager.createDBConnection([User]);

  let userInfo = await User.findAll();
  let resp: any = [];

  for (let i = 0; i < userInfo.length; i++) {
    let obj = {
      id: userInfo[i].id,
      first_name: userInfo[i].firstname,
      last_name: userInfo[i].lastname,
      email: userInfo[i].email,
      mobile_number: userInfo[i].phone,
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
      firstname: body["firstname"],
      lastname: body["lastname"],
      email: body["email"],
      phone: body["phone"],
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
    const  deletePost = await User.destroy({
      where: { id: event.queryStringParameters.id },
    });
    console.log(deletePost);
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
      body: JSON.stringify({ msg: "Internal Server Error Occured", data: "" }),
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
      event.multiValueQueryStringParameters.id == null 
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
        firstname: `${event.multiValueQueryStringParameters.firstname}`,
        lastname: `${event.multiValueQueryStringParameters.lastname}`,
        email: `${event.multiValueQueryStringParameters.email}`,
        phone: event.multiValueQueryStringParameters.phone,
      },
      { where: { id: event.multiValueQueryStringParameters.id } }
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
        id: event.queryStringParameters.id,
      },
    });

    console.log(JSON.stringify(event.queryStringParameters.id));
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

// export async function restApi(event:APIGatewayProxyEvent){
//   try{
//     // let db= new DBManager();
//     // db.createDBConnection([User])
      
//     let url ='https://jsonplaceholder.typicode.com/todos'
//     let data= new Promise((resolve, reject)=>{
//       let request=https.get(url,response=>{
//         let rawData='';
//         response.on('data',reqData=>{
//           rawData=rawData+reqData
//         });
//         response.on('end',()=>{
//           try{
//             resolve(JSON.stringify(rawData))
//         }
//         catch(e){
//        reject(new Error(e))
//         }
//         });
//       })
//       request.on('Error',(err:string|undefined)=>{
//         reject(new Error(err))
//       });
//     })

//     return {
//       statusCode: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true,
//       },
//       body: JSON.stringify({
//         msg: "Fetched data successfully..",
//         data: data,
//       }),
//     };

//   }
//   catch(e){
//     console.log("Exception due to :",e)
//     const response = {
//       statusCode: 500,
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true,
//       },
//       body: JSON.stringify({ msg: "Internal Server Error", data: e.message }),
//     };
//     return response;
//   }
 
// }

export async function currentTime(event:any){
  let response={
    statusCode:200,
    hearder:{
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body:JSON.stringify({
      message: `Hello, the current time is ${new Date().toTimeString()}.`,

    })
  }
  return response
}

// export async function httpApi(event:any)  {
//   try {
//     const result = await getRequest();
//     console.log('result is: ', result);
//     return {
//       statusCode: 200,
//       headers: {
//         'Content-Type': 'application/json',
//         "Access-Control-Allow-Origin": "*",
//         "Access-Control-Allow-Credentials": true,
//     },
//       body: JSON.stringify(result),
//     };
//   } catch (error) {
//     console.log('Error is: ', error);
//     return {
//       statusCode: 400,
//       body: error.message,
//     };
//   }
// };

// function getRequest() {

//   const url = 'https://reqres.in/api/users';

//   return new Promise((resolve, reject) => {
//     const request = https.get(url, response => {
//       let rawData = '';
//       response.on('data', data => {
//         rawData += data;
//       });

//       response.on('end', () => {
//         try {
//           resolve(JSON.parse(rawData));
//         } catch (err) {
//           reject(new Error(err));
//         }
//       });
//     });

//     request.on('error', (err: string | undefined) => {
//       reject(new Error(err));
//     });
//   });
// }

export async function usersList(event:APIGatewayProxyEvent){

try{
  let url ='https://reqres.in/api/users';
  let res = await axios.get(url);
  let jsonData = res.data['data'];
  
//   let name=jsonData['first_name']
// let email=jsonData['email']
// let avatar=jsonData.avatar
// console.log(name);
//   console.log(email);
//   console.log(avatar);
  // console.log(jsonData)
  // var name=jsonData.map((obj: { first_name: any; })=>obj.first_name)
  // var email=jsonData.map((obj: { email: any; })=>obj.email)
  // var avatar=jsonData.map((obj: { avatar: any; })=>obj.avatar)

  var name2=jsonData.map( ({first_name, email,avatar}) => ({'first_name':first_name,'email':email,'avatar':avatar}) )
  // console.log(name2)
  // console.log(test)
  // console.log(test)
  // console.log(test)
  // console.log(data);
  // console.log(data['data']);
  // console.log(email);
  // console.log(avatar);
  // console.log(avatar);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    msg: "Fetched data successfully..",
    error:"",
    data: JSON.stringify(
        name2
        // first_name: name,
			  // email:email,
			  // avatar: avatar

    ),
  };
}
  
catch(e){
  console.log("Exception due to :",e)
  const response = {
    statusCode: 500,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({ msg: "Internal Server Error", data: e.message }),
  };
  return response;
}

}