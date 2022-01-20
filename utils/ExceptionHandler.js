const  Utils  = require("./Utils");
const utils = new Utils();

class ExceptionHandler {
    constructor(mensagem = "", statusCode = 0) {
      this.mensagem = mensagem;
      this.statusCode = statusCode;
      utils.createErrorLog(this.mensagem, this.statusCode);
    }
  
    customException() {      
      return new Error(this.mensagem);
    }
  }
  
  ExceptionHandler.prototype = Object.create(Error.prototype);
  module.exports = ExceptionHandler;
  