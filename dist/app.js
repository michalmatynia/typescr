"use strict";
// Create Class
class Department {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        // private id: string
        // private title: string;
        this.employees = []; // Employees is only accessible within Object. I can access it only through internal methods
        // this.id = id;
        // this.title = n;
    }
    // class method
    describe() {
        console.log(`Department (${this.id}):${this.title}`);
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
const accounting = new Department('d1', "Accounting");
accounting.addEmployee("Max");
accounting.addEmployee("Steve");
// accounting.employees[2] = 'Anna'
accounting.describe();
accounting.printEmployeeInformation();
// accounting copy must reflect the structure of Department class, cause this reflects the object from which it is called accountingCopy
// const accountingCopy = { title: 's', describe: accounting.describe}
// accountingCopy.describe()
//# sourceMappingURL=app.js.map