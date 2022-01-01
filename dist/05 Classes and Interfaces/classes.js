"use strict";
// Create Class
// Abstract brings templates to methods, thich can be used in extended classes
class Department {
    constructor(id, title) {
        this.id = id;
        this.title = title;
        // private id: string
        // private title: string; // only accessible within main class
        // protected title: string // Works in this and extended classes
        this.employees = []; // Employees is only accessible within Object. I can access it only through internal methods
        // this.id = id;
        // this.title = n;
        /*      Static properties can only be used like below */
        // console.log(Department.fiscalYear)
    }
    // Define STATIC Method, used for utilitles, Accessible like Math.floor
    static createEmployee(title) {
        return { title: title };
    }
    addEmployee(employee) {
        this.employees.push(employee);
    }
    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}
// Static properties can't be accessed in an instance or within constructor
Department.fiscalYear = 2020;
// extended Class
class ITDepartment extends Department {
    constructor(id, admins) {
        super(id, "IT"); // Calls constructor of the PARENT class
        this.admins = admins;
    }
    describe() {
        console.log('ITE DEpartment :' + this.id);
    }
}
class AccountingDepartment extends Department {
    /* Singleton - private constructor() can't create objects based on a class */
    constructor(id, reports) {
        super(id, "Accounting");
        this.reports = reports;
        this.lastReport = reports[0];
    }
    // GETTER  - define like a method
    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error("No report Found");
    }
    // SETTER - define like a method
    set mostRecentReport(value) {
        if (!value) {
            throw new Error("Please pass a valid value");
        }
        this.addReport(value);
    }
    /*    I can override methods in extended classes */
    describe() {
        console.log("Accounting department - ID: " + this.id);
    }
    /* use staic method to get private constructor() */
    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }
        this.instance = new AccountingDepartment('d2', []);
        return this.instance;
    }
    addEmployee(title) {
        if (title === "Max") {
            return;
        }
    }
    addReport(text) {
        this.reports.push(text);
        this.lastReport = text;
    }
    printReport() {
        console.log(this.reports);
    }
}
const it = new ITDepartment("d1", ["Max"]);
// Below will no longer work, due to singleton pattern
// const accounting = new AccountingDepartment("d1", []);
const accounting = AccountingDepartment.getInstance();
// Using STATIC method
const employee1 = Department.createEmployee("Max");
console.log(employee1, Department.fiscalYear);
// Getter can be used as a PROPERTY not A METHOD
accounting.mostRecentReport = "";
accounting.addReport("some report");
console.log(accounting.mostRecentReport);
accounting.addEmployee("Max");
accounting.addEmployee("Steve");
accounting.addEmployee("John");
accounting.printReport();
// This wouldn't work, property is private in Class
// accounting.employees[2] = 'Anna'
accounting.describe();
accounting.printEmployeeInformation();
// accounting copy must reflect the structure of Department class, cause this reflects the object from which it is called accountingCopy
// const accountingCopy = { title: 's', describe: accounting.describe}
// accountingCopy.describe()
// GETTERS & SETTERS
//# sourceMappingURL=classes.js.map