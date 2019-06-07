const SkillRepository = require('./Skill.repository');

module.exports = {
  async getAll() {
    return await SkillRepository.getAll();
  }
}