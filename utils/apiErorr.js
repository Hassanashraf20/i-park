class apiError extends Error{
    constructor(message,statusCode){
       super(message)
       this.statusCode= statusCode
       this.status= ` ${statusCode}` .startsWith(4)? "fail" : "Error"
       this.oprational= true
   
   
    }
   
   }
   module.exports = apiError