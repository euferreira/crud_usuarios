const { UsuarioService } = require("../services");
const usuarioService = new UsuarioService();

class UsuarioController {
  /**
   * Retorna uma lista de usuários
   * @param {*} req
   * @param {*} res
   * @returns {[]} Uma lista de Usuários
   */
  static async getAllUsers(req, res) {
    try {
      const allUsers = await usuarioService.getAllUsers();

      if (allUsers.length > 0) {
        return res.status(200).json(allUsers);
      }
      return res.status(204).json();
    } catch (e) {
      const status = e["statusCode"] != null ? e["statusCode"] : 500;
      const message = e["mensagem"] != null ? e["mensagem"] : e.message;

      return res.status(status).json({ error: message });
    }
  }

  /**
   * Retorna um objeto dado seu ID
   * @param {*} req
   * @param {*} res
   * @returns Um objeto JSON do usuário
   */
  static async getUsersById(req, res) {
    try {
      const allUsers = await usuarioService.getUserById(req.params);
      return res.status(200).json(allUsers);
    } catch (e) {
      const status = e["statusCode"] != null ? e["statusCode"] : 500;
      const message = e["mensagem"] != null ? e["mensagem"] : e.message;

      return res.status(status).json({ error: message });
    }
  }

  /**
   * Insere um novo usuário no banco
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async setUsers(req, res) {
    try {
      const registro = await usuarioService.inserirDados(req.body);

      return res.status(201).json(registro);
    } catch (e) {
      const status = e["statusCode"] != null ? e["statusCode"] : 500;
      const message = e["mensagem"] != null ? e["mensagem"] : e.message;

      return res.status(status).json({ error: message });
    }
  }

  /**
   * Atualiza um usuário dado seu ID
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async updateUsers(req, res) {
    try {
      const userUpdated = await usuarioService.updateUsers(req);
      return res.status(200).json(userUpdated);
    } catch (e) {
      const status = e["statusCode"] != null ? e["statusCode"] : 500;
      const message = e["mensagem"] != null ? e["mensagem"] : e.message;

      return res.status(status).json({ error: message });
    }
  }

  /**
   * Exclui um usuário dado seu ID
   * @param {*} req
   * @param {*} res
   * @returns
   */
  static async deleteUsers(req, res) {
    try {
      const userUpdated = await usuarioService.deleteUsers(req);
      return res.status(200).json(userUpdated);
    } catch (e) {
      const status = e["statusCode"] != null ? e["statusCode"] : 500;
      const message = e["mensagem"] != null ? e["mensagem"] : e.message;

      return res.status(status).json({ error: message });
    }
  }
}

module.exports = UsuarioController;
