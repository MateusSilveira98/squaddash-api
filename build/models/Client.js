"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.logo = '';
        this.cnpj = '';
        this.status = true;
        this.deleted = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Client;
}());
exports.Client = Client;
module.exports = new Client();
