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
const app_1 = require("./model/app");
// import { APIGatewayProxyEvent } from '/Users/bindureddykr/Desktop/Aws_Serverless_Demo_Code/nodejs/node_modules/@types/aws-lambda/index';
function getUsers(event) {
    return __awaiter(this, void 0, void 0, function* () {
        let dbManager = new db_manager_1.default();
        yield dbManager.createDBConnection([app_1.default]);
        let userInfo = yield app_1.default.findAll();
        let resp = [];
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
    });
}
exports.getUsers = getUsers;
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
            console.log(event.toString());
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
            console.log(data.toString());
            const post = yield app_1.default.create(data);
            console.log(post.toString());
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
                    body: JSON.stringify({
                        data: "",
                        msg: "Please Pass the required queryParameters [id]",
                    })
                };
            }
            const deletePost = yield app_1.default.destroy({
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
        }
        catch (error) {
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
    });
}
exports.deleteUserResp = deleteUserResp;
function updateUser(event) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let db_manager = new db_manager_1.default();
            yield db_manager.createDBConnection([app_1.default]);
            if (event.multiValueQueryStringParameters == null ||
                event.multiValueQueryStringParameters.id == null) {
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
            let updatePost = yield app_1.default.update({
                firstname: `${event.multiValueQueryStringParameters.firstname}`,
                lastname: `${event.multiValueQueryStringParameters.lastname}`,
                email: `${event.multiValueQueryStringParameters.email}`,
                phone: event.multiValueQueryStringParameters.phone,
            }, { where: { id: event.multiValueQueryStringParameters.id } });
            console.log(updatePost);
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