"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Employee = /** @class */ (function () {
    function Employee() {
        this.id = '';
        this.name = '';
        this.salary = 0.0;
        this.modality_of_contracting = '';
        this.profession = '';
        this.status = false;
        this.deleted = false;
        this.created_at = new Date();
        this.updated_at = new Date();
    }
    return Employee;
}());
exports.Employee = Employee;
module.exports = new Employee();
