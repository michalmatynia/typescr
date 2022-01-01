// Create Class

class Department {
  // private id: string
  // private title: string;
  private employees: string[] = []; // Employees is only accessible within Object. I can access it only through internal methods

  constructor(private id: string, public title: string) {
    // this.id = id;
    // this.title = n;
  }

  // class method
  describe(this: Department) {
    console.log(`Department (${this.id}):${this.title}`);
  }

  addEmployee(employee: string) {
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
