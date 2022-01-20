const usuarioSchema = require("../schemas/usuarioSchema");
const fs = require("fs");
const path = require("path");
const moment = require("moment");

class Utils {
  /**
   * Valida o corpo da requisição
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  validationSchemaMiddleware(req, res, next) {
    const { error } = usuarioSchema.validate(req.body);
    const valid = error === null || error === undefined;

    if (valid) {
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(",");
      res.status(422).json({ error: message });
    }
  }

  createLog(req, res, next) {
    // This opens up the writeable stream to `output`
    var writeStream = fs.createWriteStream(`log.txt`, {flags: "a"} );

    // This pipes the POST data to the file
    req.pipe(writeStream);
    const data = `${moment().format()} - ${req.method} - ${req.originalUrl}\n`;
    writeStream.write(data);

    writeStream.on('error', function (err) {
      console.log(err);
    });
    next();
  }

  createErrorLog(msg, code) {
    // This opens up the writeable stream to `output`
    var writeStream = fs.createWriteStream(`log-error.txt`, {flags: "a"} );
    const data = `${moment().format()} - error: ${msg} - code: ${code}\n`;
    writeStream.write(data);

    writeStream.on('error', function (err) {
      console.log(err);
    });
  }
}

module.exports = Utils;
