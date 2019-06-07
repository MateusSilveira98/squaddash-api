const SkillService = require('./Skill.service');
const Callbacks = require('../_Helpers/Callbacks');

module.exports = {
  async getAll(req, res) {
    try {
      const skills = await SkillService.getAll();
      return res.json(skills);
    } catch (error) {
      console.log(error);
      return res.json(Callbacks.callbackHandler('error', error || 'falha ao buscar as habilidades'));
    }
  }
};