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
class Responses {
    static successCode(post) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = {
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
            catch (e) {
                console.log("Error due to Techincal Gliches");
            }
        });
    }
    static failureCode() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                statusCode: 500,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify({ msg: "Internal Server Error Supported to Unknown", data: "" }),
            };
            return response;
        });
    }
}
exports.default = Responses;
//# sourceMappingURL=response_connection.js.map