const UserRepository = require('./User.repository');
const Callbacks = require('../_Helpers/Callbacks');
const config = require('../config.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Dates = require('../_Helpers/FormatDate');
const create = async (param) => {
  try {
    const user = await UserRepository.getByEmail(param.email);
    if (user) throw 'este email já está criado! :(';
    param.password = bcrypt.hashSync(param.password, 10);
    await UserRepository.create(param);
    return Callbacks.callbackHandler('success', 'usuário criado com sucesso! :)')
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao criar o usuário! :(')
  }
}
const edit = async (param) => {
  try {
    param.updated_at = Dates.formatDate(Date.now());
    const user = await UserRepository.getById(param.id);
    if(!user) throw 'usuário não encontrado! :(';
    if (param.password)
      param.password = bcrypt.hashSync(param.password, 10);
    Object.assign(user, param);
    let userModified = await UserRepository.edit(user);
    return Callbacks.callbackHandler('success', 'usuário alterado com sucesso! :)', userModified[0])
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao alterar o usuário! :(')
  }
}
const login = async (param) => {
  try {
    const user = await UserRepository.getByEmail(param.email);
    if(!user) throw 'usuário não encontrado! :(';
    if (bcrypt.compareSync(param.password, user.password)) {
      const token = `Bearer ${jwt.sign({ sub: user.id }, config.secret)}`;
      delete user.password;
      return  {
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
    delete user.password;
    if(!user) throw 'usuário não encontrado! :(';
    return user
  } catch (error) {
    return Callbacks.callbackHandler('error', error || 'falha ao buscar o usuário')
  }
}
const getAll = async (id) => {
  try {
    return await UserRepository.getAll(id);
  } catch(error) {
    return Callbacks.callbackHandler('error', error  || 'falha ao buscar os usuários')
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