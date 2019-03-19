"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Role_1 = require("./Role");
var User = /** @class */ (function () {
    function User() {
        this.id = '';
        this.name = '';
        this.email = '';
        this.profile_photo = '';
        this.password = '';
        this.role = new Role_1.Role();
        this.status = true;
        this.deleted = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return User;
}());
exports.User = User;
module.exports = new User();
