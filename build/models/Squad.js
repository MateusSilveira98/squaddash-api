"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Squad = /** @class */ (function () {
    function Squad() {
        this.id = '';
        this.name = '';
        this.cost = 0;
        this.employees = [];
        this.status = false;
        this.deleted = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Squad;
}());
exports.Squad = Squad;
module.exports = new Squad();
