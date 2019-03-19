export class Role {
  id: String = '';
  type: String = '';
  created_at: Date = new Date();
  updated_at: Date = new Date();
  constructor(){}
}
module.exports = new Role();