

class ApiError extends Error{

    constructor(message,statusCode){

        super(message);
        this.statusCode =statusCode ||500;
        this.status= `${statusCode}`.startsWith(4)? "failed" :"error";
        this.isOperational =true; //operational depends on development mode :this is an error i can predict

    }

}


module.exports=ApiError;