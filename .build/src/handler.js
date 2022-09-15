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
exports.getUserViaId = exports.updateUser = exports.deleteUserResp = exports.postUserResp = exports.getUsers = void 0;
const db_manager_1 = require("./db_manager/db_manager");
const response_connection_1 = require("./db_manager/response_connection");
const app_1 = require("./model/app");
function getUsers(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let dbManager = new db_manager_1.default();
        yield dbManager.createDBConnection([app_1.default]);
        let userInfo = yield app_1.default.findAll();
        let resp = [];
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
    });
}
exports.getUsers = getUsers;
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
function postUserResp(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dbManager = new db_manager_1.default();
            yield dbManager.createDBConnection([app_1.default]);
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
            const post = yield app_1.default.create(data);
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
        }
        catch (error) {
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
    });
}
exports.postUserResp = postUserResp;
function deleteUserResp(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let dbManger = new db_manager_1.default();
            yield dbManger.createDBConnection([app_1.default]);
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
            let deletePost = yield app_1.default.destroy({
                where: { Id: event.queryStringParameters.Id },
            });
            console.log(deletePost);
            return response_connection_1.default.successCode(deletePost);
        }
        catch (error) {
            console.log(error);
            return response_connection_1.default.failureCode();
        }
    });
}
exports.deleteUserResp = deleteUserResp;
function updateUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db_manager = new db_manager_1.default();
            yield db_manager.createDBConnection([app_1.default]);
            if (event.queryStringParameters == null ||
                event.queryStringParameters.Id == null) {
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
            let update = yield app_1.default.update({
                First_Name: "modified",
                Last_Name: "updated",
                Email: "update@gmail.com",
                Mobile_Number: +9983424492,
            }, { where: { Id: event.queryStringParameters.Id } });
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
        }
        catch (e) {
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
    });
}
exports.updateUser = updateUser;
function getUserViaId(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db = new db_manager_1.default();
            yield db.createDBConnection([app_1.default]);
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
            let posts = yield app_1.default.findOne({
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
        }
        catch (error) {
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
    });
}
exports.getUserViaId = getUserViaId;
//# sourceMappingURL=handler.js.map