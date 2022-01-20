const bodyParser = require("body-parser");
const usuarioRoute = require("./usuarioRoute");

module.exports = (app) => {
  app.use(
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    usuarioRoute
  );  

  app.get("/", (req, res) => res.status(200).send({ send: "OK" }));
};
