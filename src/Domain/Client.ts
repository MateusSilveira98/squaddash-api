export class Client {
  id: String = '';
  name: String = '';
  email: String = '';
  logo: String = '';
  cnpj: String = '';
  status: Boolean = true;
  deleted: Boolean = false;
  created_at: String = '';
  updated_at: String = '';
  constructor(){ }
}
module.exports = new Client()