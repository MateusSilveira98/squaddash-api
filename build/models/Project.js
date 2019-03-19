"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./Client");
var Squad_1 = require("./Squad");
var Project = /** @class */ (function () {
    function Project() {
        this.id = '';
        this.name = '';
        this.client = new Client_1.Client();
        this.squad = new Squad_1.Squad();
        this.begin_date = '';
        this.finish_date = '';
        this.status = false;
        this.deleted = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Project;
}());
exports.Project = Project;
module.exports = new Project();
