const UserRepository = require('./User.repository');
const Callbacks = require('../_Helpers/Callbacks');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');

const create = async (param) => {
  try {
    const user = await UserRepository.getByEmail(param.email);
    if (user) throw 'este email já está cadastrado! :(';
    param.password = bcrypt.hashSync(param.password, 10);
    await UserRepository.create(param);
    return Callbacks.callbackHandler('success', 'usuário cadastrado com sucesso! :)')
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao cadastrar o usuário! :(')
  }
}
const edit = async (param) => {
  try {
    const user = await UserRepository.getById(param.id);
    delete user.type;
    if(!user) throw 'usuário não encontrado! :(';
    if (param.password) {
      param.password = bcrypt.hashSync(param.password, 10);
    }
    Object.assign(user, param);
    await UserRepository.edit(user);
    return Callbacks.callbackHandler('success', 'usuário editado com sucesso! :)')
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao editar o usuário! :(')
  }
}
const login = async (param) => {
  try {
    const user = await UserRepository.getByEmail(param.email);
    if(!user) throw 'usuário não encontrado! :(';
    if (bcrypt.compareSync(param.password, user.password)) {
      const token = `Bearer ${jwt.sign({ sub: user.id }, config.secret)}`;
      delete user.password;
      return {
        ...user,
        token
      };
    } else {
      throw 'email ou senha inválidos'
    }
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao fazer o login! :(')
  }
}
const getById = async (id) => {
  try {
    const user = await UserRepository.getById(id);
    if(!user) throw 'usuário não encontrado! :(';
    return user
  } catch (error) {
    return Callbacks.callbackHandler('error', error)
  }
}
const getAll = async (id) => {
  try {
    return await UserRepository.getAll(id);
  } catch(error) {
    return Callbacks.callbackHandler('error', error)
  }
}
const getByIdToAuthenticate = async (id) => {
  return await UserRepository.getByIdToAuthenticate(id);
}
module.exports = {
  create,
  edit,
  login,
  getById,
  getByIdToAuthenticate,
  getAll
}