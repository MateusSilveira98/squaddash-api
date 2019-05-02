const UserService = require('./User.service');

const create = async (req, res) => {
  const user = await UserService.create(req.body);
  return res.json(user);
}
const edit = async (req, res) => {
  const user = await UserService.edit(req.body);
  return res.json(user);
}
const login = async (req, res) => {
  const user = await UserService.login(req.body);
  return res.json(user);
}
const getById = async (req, res) => {
  const user = await UserService.getById(req.params.id);
  return res.json(user);
}
const getAll = async (req, res) => {
  const users = await UserService.getAll(req.params.id);
  return res.json(users);
}
module.exports = {
  create,
  edit,
  login,
  getById,
  getAll
};