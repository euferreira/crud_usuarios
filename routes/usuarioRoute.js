const Router = require("express");
const router = Router();
const UsuarioController = require("../controllers/UsuarioController");
const { Utils } = require("../utils");
const utils = new Utils();

router
  .get("/api/usuario", utils.createLog, UsuarioController.getAllUsers)
  .get("/api/usuario/:id", utils.createLog, UsuarioController.getUsersById);
router.post(
  "/api/usuario",
  utils.createLog,
  utils.validationSchemaMiddleware,
  UsuarioController.setUsers
);
router.put(
  "/api/usuario/:id",
  utils.createLog,
  utils.validationSchemaMiddleware,
  UsuarioController.updateUsers
);
router.delete("/api/usuario/:id", utils.createLog, UsuarioController.deleteUsers);

module.exports = router;
