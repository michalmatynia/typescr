// Create Class

// Abstract brings templates to methods, thich can be used in extended classes
abstract class Department {
  // Static properties can't be accessed in an instance or within constructor
  static fiscalYear = 2020;
  // private id: string
  // private title: string; // only accessible within main class
  // protected title: string // Works in this and extended classes
  protected employees: string[] = []; // Employees is only accessible within Object. I can access it only through internal methods

  constructor(protected readonly id: string, public title: string) {
    // this.id = id;
    // this.title = n;
    /*      Static properties can only be used like below */
    // console.log(Department.fiscalYear)
  }

  // Define STATIC Method, used for utilitles, Accessible like Math.floor
  static createEmployee(title: string) {
    return { title: title };
  }

  // class method
  // abstract - I can use empty method and force all extending classes to use that method
  // console.log(`Department (${this.id}):${this.title}`);
  abstract describe(this: Department): void 

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

// extended Class

class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT"); // Calls constructor of the PARENT class
    this.admins = admins;
  }

  describe() {
    console.log('ITE DEpartment :' + this.id)
  }
}
class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment; // Sets the Singleton static instance

  // GETTER  - define like a method

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report Found");
  }

  // SETTER - define like a method
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass a valid value");
    }
    this.addReport(value);
  }

  /* Singleton - private constructor() can't create objects based on a class */

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  /*    I can override methods in extended classes */
  describe() {
    console.log("Accounting department - ID: " + this.id);
  }

  /* use staic method to get private constructor() */
  static getInstance() {
    if(AccountingDepartment.instance) {
      return this.instance

    }

    this.instance = new AccountingDepartment('d2', [])
    return this.instance

  }
  addEmployee(title: string) {
    if (title === "Max") {
      return;
    }
  }
  addReport(text: string) {
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
const accounting = AccountingDepartment.getInstance()

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
