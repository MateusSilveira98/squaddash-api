import {Role} from './Role';
export class User {
  id: String = '';
  name: String = '';
  email: String = '';
  profile_photo: String = '';
  password: String = '';
  role: Role = new Role();
  status: Boolean = true;
  deleted: Boolean = false;
  created_at: Date = new Date()
  updated_at: Date = new Date()
  constructor() { }
}
module.exports = new User();