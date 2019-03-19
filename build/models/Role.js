"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role = /** @class */ (function () {
    function Role() {
        this.id = '';
        this.type = '';
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Role;
}());
exports.Role = Role;
module.exports = new Role();
