const SquadService = require('./Squad.service');
module.exports = {
  async create(req, res) {
    const created = await SquadService.create(req.body)
    return res.json(created);
  },
  async edit(req, res) {
    const updated = await SquadService.edit(req.body)
    return res.json(updated);
  },
  async getAll(req, res) {
    const squads = await SquadService.getAll();
    return res.json(squads);
  },
  async getById(req, res) {
    const squad = await SquadService.getById(req.params.id);
    return res.json(squad);
  }
};