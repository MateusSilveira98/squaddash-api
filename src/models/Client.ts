export class Client {
  id: String = '';
  name: String = '';
  email: String = '';
  logo: String = '';
  cnpj: String = '';
  status: Boolean = true;
  deleted: Boolean = false;
  created_at: Date = new Date()
  updated_at: Date = new Date()
  constructor(){ }
}
module.exports = new Client()