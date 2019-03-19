import { Employee } from './Employee';
export class Squad {
  id: String = '';
  name: String = '';
  cost: Number = 0;
  employees: Array<Employee> = [];
  status: Boolean = false;
  deleted: Boolean = false;
  created_at: Date = new Date()
  updated_at: Date = new Date()
  constructor() { }
}
module.exports = new Squad();