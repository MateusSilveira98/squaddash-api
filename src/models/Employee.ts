export class Employee {
  id: String = '';
  name: String = '';
  salary: Number = 0.0;
  modality_of_contracting: String = '';
  profession: String = '';
  status: Boolean = false;
  deleted: Boolean = false;
  created_at: Date = new Date()
  updated_at: Date = new Date()

  constructor(){}
}
module.exports = new Employee();