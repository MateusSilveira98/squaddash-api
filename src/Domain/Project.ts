import { Client } from "./Client";
import { Squad } from "./Squad";

export class Project {
  id: String = '';
  name: String = '';
  client: Client = new Client();
  squad: Squad = new Squad();
  begin_date: String = '';
  finish_date: String = '';
  status: Boolean = false;
  deleted: Boolean = false;
  created_at: String = '';
  updated_at: String = '';
  constructor() { }
}
module.exports = new Project();