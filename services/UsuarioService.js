const Services = require("./Services");
const database = require("../models");
const { ExceptionHandler } = require("../utils");

class UsuarioService extends Services {
  constructor() {
    super("usuarios");
  }

  async getAllUsers() {
    try {
      return await database[this.nomeModelo].findAll();
    } catch (e) {
      throw e;
    }
  }

  async getUserById(params) {
    try {
      const { id } = params;

      //se o id for menor ou igual a zero, retorna um exception
      if (id === undefined || Number(id) <= 0) {
        throw new ExceptionHandler("ID informado inválido.", 400);
      }

      const usuario = await database[this.nomeModelo].findOne({
        where: {
          id: Number(id),
        },
      });

      //se não encontrou o usuário
      if (usuario === null || usuario === undefined) {
        throw new ExceptionHandler(
          "Nenhum usuário encontrado com o id informado.",
          400
        );
      }

      return usuario;
    } catch (e) {
      throw e;
    }
  }

  async inserirDados(body) {
    try {
      const novoUsuario = body;

      //busca se o usuário já existe
      const existeUsuario = await database[this.nomeModelo].findOne({
        where: {
          email: novoUsuario.email,
        },
      });

      //se existe um usuário
      if (existeUsuario !== null) {
        throw new ExceptionHandler(
          "Já existe um usuário com os dados cadastrados.",
          400
        );
      }

      return await database[this.nomeModelo].create(body);
    } catch (e) {
      throw e;
    }
  }

  async updateUsers(req) {
    try {
      const { id } = req.params;
      const upgrade = req.body;

      const result = await database[this.nomeModelo].update(upgrade, {
        where: {
          id: Number(id),
        },
      });

      if (result > 0) {
        const usuarioAtualizado = await database[this.nomeModelo].findOne({
          where: {
            id: Number(id),
          },
        });

        return {
          msg: "Usuário atualizado com sucesso.",
          data: usuarioAtualizado,
        };
      } else {
        throw new ExceptionHandler(
          "Não foi possível atualizar os dados do usuário, por favor, verifique e tente novamente.",
          400
        );
      }
    } catch (e) {
      throw e;
    }
  }

  async deleteUsers(req) {
    try {
      const { id } = req.params;

      const result = await database[this.nomeModelo].destroy({
        where: { id: Number(id) },
      });

      if (result > 0) {
        return {
          msg : `O registro ${id} foi deletado com sucesso`
        }
      }
      throw new ExceptionHandler("Nenhum registro encontrado.", 400);
    } catch (e) {
      throw e;
    }
  }
}

module.exports = UsuarioService;
