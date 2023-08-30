export function responseHandler(data:any, message:string, success:boolean, statusCode:number) {
    return {
        data: data,
        message: message,
        success: success,
        statusCode: statusCode
    };
}