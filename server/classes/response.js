class Response{
    constructor(){
        this.success=true;
        this.message="";
        this.data= {};
    }
    Value(){
        return {
            success:this.success,
            message :this.message,
            data:this.data
        }
    }
}
module.exports = Response;