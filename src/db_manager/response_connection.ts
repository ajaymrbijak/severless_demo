

class  Responses {
    static  async  successCode(post:any){
    try{
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
          return response 
        }
    
    catch(e){
        console.log("Error due to Techincal Gliches")
    }
}

static async failureCode() {
    const response = {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        body: JSON.stringify({ msg: "Internal Server Error Supported to Unknown", data: "" }),
      };

return response
}

}
export default Responses;