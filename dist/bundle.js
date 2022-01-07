"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var App;
(function (App) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
        ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
    })(ProjectStatus = App.ProjectStatus || (App.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    App.Project = Project;
})(App || (App = {}));
var App;
(function (App) {
    class State {
        constructor() {
            this.listeners = [];
        }
        addListener(listenerFn) {
            this.listeners.push(listenerFn);
        }
    }
    class ProjectState extends State {
        constructor() {
            super();
            this.projects = [];
        }
        static getInstance() {
            if (this.instance) {
                return this.instance;
            }
            this.instance = new ProjectState();
            return this.instance;
        }
        addProject(title, description, numOfPeople) {
            const newProject = new App.Project(Math.random().toString(), title, description, numOfPeople, App.ProjectStatus.Active);
            this.projects.push(newProject);
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus) {
                project.status = newStatus;
                this.updateListeners();
            }
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    App.ProjectState = ProjectState;
    App.projectState = ProjectState.getInstance();
})(App || (App = {}));
var App;
(function (App) {
    function Myvalidate(validatableInput) {
        let isValid = true;
        if (validatableInput.required) {
            isValid = isValid && validatableInput.value.toString().trim().length !== 0;
        }
        if (validatableInput.minLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length >= validatableInput.minLength;
        }
        if (validatableInput.maxLength != null &&
            typeof validatableInput.value === "string") {
            isValid =
                isValid && validatableInput.value.length <= validatableInput.maxLength;
        }
        if (validatableInput.min != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value >= validatableInput.min;
        }
        if (validatableInput.max != null &&
            typeof validatableInput.value === "number") {
            isValid = isValid && validatableInput.value <= validatableInput.max;
        }
        return isValid;
    }
    App.Myvalidate = Myvalidate;
})(App || (App = {}));
var App;
(function (App) {
    // autobind decorator
    function Myautobind(_, _2, descriptor) {
        const originalMethod = descriptor.value;
        const adjDescriptor = {
            configurable: true,
            get() {
                const boundFn = originalMethod.bind(this);
                return boundFn;
            },
        };
        return adjDescriptor;
    }
    App.Myautobind = Myautobind;
})(App || (App = {}));
var App;
(function (App) {
    // Component Base Class
    class Component {
        constructor(templateId, hostElementId, insertAtStart, newElementId) {
            this.templateElement = document.getElementById(templateId);
            this.hostElement = document.getElementById(hostElementId);
            const importedNode = document.importNode(this.templateElement.content, true);
            this.element = importedNode.firstElementChild;
            if (newElementId) {
                this.element.id = newElementId;
            }
            this.attach(insertAtStart);
        }
        attach(insertAtBeginning) {
            this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
        }
    }
    App.Component = Component;
})(App || (App = {}));
/// <reference path="base-component.ts" />
var App;
(function (App) {
    // ProjectInput Class
    class ProjectInput extends App.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = this.element.querySelector("#title");
            this.descriptionInputElement = this.element.querySelector("#description");
            this.peopleInputElement = this.element.querySelector("#people");
            this.configure();
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
        gatherUserInput() {
            const enteredTitle = this.titleInputElement.value;
            const enteredDescription = this.descriptionInputElement.value;
            const enteredPeople = this.peopleInputElement.value;
            const titleValidatable = {
                value: enteredTitle,
                required: true,
            };
            const descriptionValidatable = {
                value: enteredDescription,
                required: true,
                minLength: 5,
            };
            const peopleValidatable = {
                value: +enteredPeople,
                required: true,
                min: 1,
                max: 5,
            };
            if (!App.Myvalidate(titleValidatable) ||
                !App.Myvalidate(descriptionValidatable) ||
                !App.Myvalidate(peopleValidatable)) {
                alert("Invalid input, please try again!");
                return;
            }
            else {
                return [enteredTitle, enteredDescription, +enteredPeople];
            }
        }
        clearInputs() {
            this.titleInputElement.value = "";
            this.descriptionInputElement.value = "";
            this.peopleInputElement.value = "";
        }
        submitHandler(event) {
            event.preventDefault();
            const userInput = this.gatherUserInput();
            if (Array.isArray(userInput)) {
                const [title, desc, people] = userInput;
                App.projectState.addProject(title, desc, people);
                this.clearInputs();
            }
        }
    }
    __decorate([
        App.Myautobind
    ], ProjectInput.prototype, "submitHandler", null);
    App.ProjectInput = ProjectInput;
})(App || (App = {}));
/// <reference path="base-component.ts" />
var App;
(function (App) {
    // ProjectList Class
    class ProjectList extends App.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const prjId = event.dataTransfer.getData("text/plain");
            App.projectState.moveProject(prjId, this.type === "active" ? App.ProjectStatus.Active : App.ProjectStatus.Finished);
        }
        dragLeaveHandler(event) {
            const lsitEl = this.element.querySelector("ul");
            lsitEl.classList.remove("droppable");
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            App.projectState.addListener((projects) => {
                const relevantProjects = projects.filter((prj) => {
                    if (this.type === "active") {
                        return prj.status === App.ProjectStatus.Active;
                    }
                    else {
                        return prj.status === App.ProjectStatus.Finished;
                    }
                });
                this.assignedProjects = relevantProjects;
                this.renderProjects();
            });
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new App.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
    }
    __decorate([
        App.Myautobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        App.Myautobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        App.Myautobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    App.ProjectList = ProjectList;
})(App || (App = {}));
/// <reference path="models/drag-drop-interfaces.ts" />
/// <reference path="models/project-model.ts" />
/// <reference path="state/project-state.ts" />
/// <reference path="util/validation.ts" />
/// <reference path="decorators/autobind-decorator.ts" />
/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />
var App;
(function (App) {
    new App.ProjectInput();
    new App.ProjectList("active");
    new App.ProjectList("finished");
})(App || (App = {}));
// Arrow Function
const add = (a, b) => {
    return a + b;
};
// Arrow Function = One Expression Version
const addShort = (a, b) => a + b;
// Arrow Function = One Parameter - I can remove Parentheses
const addOneArgs = (a) => console.log(a);
// Spread Operator - Array
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];
// Array are OBJECTS - OBJECTS are REFERENCE VALUES - We don't change the address when I push, we only change memory
// I can push to const
// add array as a list of individual values
activeHobbies.push(...hobbies);
// OR 
const activeHobbiesTwo = ['Hiking', ...hobbies];
// Spread Operator - Object
const persona = {
    name: 'Max',
    age: 30
};
// This is not a copy, we just copied a pointer to a different space in memory
const instancePerson = persona;
// To create a real copy, use Spread operator
const trueCopiedPerson = Object.assign({}, persona);
// REST Parameter
const addrest = (...numbers) => {
    return numbers.reduce((accum, currentVal) => {
        return accum + currentVal;
    }, 0);
};
const addedNumbers = addrest(4, 5, 6, 7, 8, 8);
// Destructuring
// 1. Array 
const hobi = ['Hiking', 'Cooking', 'Sleeping'];
const [hobby1, hobby2, ...rest] = hobi;
// 2. Object
const { age } = persona, restpersona = __rest(persona, ["age"]);
// function add(n1: number, n2: number): number {
//     return n1 + n2
// }
// function printResult(num: number): void {
//     console.log('Result: ' + num )
// }
// function addAndHandle(n1: number, n2: number, cb: (num : number) => void) {
//     const result = n1 + n2;
//     cb(result)
// }
// printResult(add(3,6))
// let combineValues: (a: number, b: number) => number;
// combineValues = add;
// console.log(combineValues(7,8))
// addAndHandle(10, 20, (result)=>{
//     console.log('testy')
//     console.log(result);
// })
// const person: {
//   name: string;
//   age: number;
// } = {
// const person: {
//   name: string;
//   age: number;
//   hobbies: string[];
//   role: [number, string];
// } = {
//   name: 'Maximilian',
//   age: 30,
//   hobbies: ['Sports', 'Cooking'],
//   role: [2, 'author']
// };
// const ADMIN = 0;
// const READ_ONLY = 1;
// const AUTHOR = 2;
var Role;
(function (Role) {
    Role["ADMIN"] = "ADMIN";
    Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
    Role["AUTHOR"] = "AUTHOR";
})(Role || (Role = {}));
;
const person = {
    name: 'Maximilian',
    age: 30,
    hobbies: ['Sports', 'Cooking'],
    role: Role.ADMIN
};
// person.role.push('admin');
// person.role[1] = 10;
// person.role = [0, 'admin', 'user'];
let favoriteActivities;
favoriteActivities = ['Sports'];
console.log(person.name);
for (const hobby of person.hobbies) {
    console.log(hobby.toUpperCase());
    // console.log(hobby.map()); // !!! ERROR !!!
}
if (person.role === Role.AUTHOR) {
    console.log('is author');
}
function combine(input1, input2, resultConversion) {
    let result;
    if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
        result = +input1 + +input2;
    }
    else {
        result = input1.toString() + input2.toString();
    }
    // if(result === 'as-number') {
    //     return +result
    // } else {
    //     return result.toString()
    // }
    return result;
}
const combineAges = combine(30, 26, 'as-number');
console.log(combineAges);
const combineStringAges = combine('30', '26', 'as-number');
console.log(combineStringAges);
const combineNames = combine('Max', 'Anna', 'as-number');
console.log(combineNames);
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
let addd;
addd = (n1, n2) => {
    return n1 + n2;
};
class Person {
    constructor(n) {
        this.age = 30;
        if (n) {
            this.firstName = n;
        }
    }
    greet(phrase) {
        if (this.firstName) {
            console.log(phrase + " " + this.firstName);
        }
        else {
            console.log('Hi');
        }
    }
}
// I can use interface as a Type
let user1;
user1 = new Person();
user1 = {
    firstName: "Max",
    age: 30,
    greet(phrase) {
        console.log(phrase + " " + this.firstName);
    },
};
/* INTERSECTION TYPES */
var _a;
;
;
// Merge Object types
// type ElevatedEmployee = Admin & Employee
const el = {
    firstName: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
};
/* TYPE GUARDS */
function addTyp(a, b) {
    // Type Guard - typeof - GOOD FOR EVERYTHING
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
// 'in' TYPE GUARD - GOOD FOR OBJECTS
function printEmployeeInformation(emp) {
    console.log('Name: ' + emp.firstName);
    // Type Guard for internal Class property
    if ('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
        console.log('Start Date: ' + emp.startDate);
    }
}
printEmployeeInformation({ firstName: 'Steve', startDate: new Date() });
// Instance of Type Guard Class - GOOD FOR INSTANCES
class Car {
    drive() {
        console.log('Driving...');
    }
}
class Truck {
    drive() {
        console.log('Driving...');
    }
    loadCargo(amount) {
        console.log('Loading amount...' + amount);
    }
}
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    // Instance of Type Guard
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(v1);
useVehicle(v2);
function moveAnimal(animal) {
    let speed;
    switch (animal.kind) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
    }
    console.log('Moving Speed: ' + speed);
}
moveAnimal({ kind: 'bird', flyingSpeed: 10 });
/* TYPE CASTING */
// Version 1
const userInputElement = document.getElementById('user-input'); // I need to signify, that's it's HTML INPUT ELEMENT
userInputElement.value = 'Hi there !';
// Version 2 for React 
const userInputElement2 = document.getElementById('user-input'); // I need to signify, that's it's not UNDEFINED AND  HTML INPUT ELEMENT
userInputElement2.value = 'Hi there !';
// Version 3 for React , to avoid exclamation mark (if unsure whether the value if undefined)
const userInputElement3 = document.getElementById('user-input'); // I need to signify, that's it's not UNDEFINED AND  HTML INPUT ELEMENT
if (userInputElement3) {
    userInputElement3.value = 'Hi there !';
}
const errorBag = {
    id: 'some id',
    email: 'some string',
    username: 'Must start with a letter'
};
function addTypOverload(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
const result = addTypOverload('Max', 'Schwarz');
result.split(' ');
// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    firstName: 'Max',
    job: { title: 'CEO', description: 'job description' }
};
// OPTIONS CHaining !
console.log(fetchedUserData.job && fetchedUserData.job.title);
// In Typescript I have an even better way of Checking
console.log((_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
// NULLISH COALESCING
const userInput = '';
const storedData = userInput !== null && userInput !== void 0 ? userInput : 'DEFAULT'; // If this is null or and undefined, print even if it's an empty string (doesn't treat empty string as falsy)
/* GENERICS - type definition for more complex data fetches*/
/* GENERIC FUNCTIONS */
// Array Generic
const names = []; // string[]
// names[0].split(' ')
// Promise Generic
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("This is done!");
    }, 2000);
});
promise.then((data) => {
    // data.split(' ')
});
// CREATE GENERICS FUNCTIONS
// <T, U> These two parameters will often be of different TYPE, therefore we can merge it
// Generic types are restricted by extends constrain
function merge(objA, objB) {
    return Object.assign(objA, objB);
}
// console.log(merge({name: 'Max'}, {age: 30}));
// Now typescript understand, that it needs to return Intersection
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.age);
function countAndDescribe(element) {
    let descriptionText = "Got no value";
    if (element.length === 1) {
        descriptionText = "Got 1 element";
    }
    else if (element.length > 1) {
        descriptionText = "Got " + element.length + " elements.";
    }
    return [element, descriptionText];
}
console.log(countAndDescribe("Hi there"));
// Handling Dynamic keys
function extractAndConvert(obj, key) {
    return "Value: " + obj[key];
}
console.log(extractAndConvert({ name: "Max" }, "name"));
/* GENERIC CLASSES */
// UNION TYPES when I'm flexbile to have a different type with each functional call or class instance creation
// GENERIC TYPES Lock in a one type across function calls
// assign a generic type T
// This has number OR string OR boolean ARRAY, but not all of them
class DataStorage {
    constructor() {
        this.data = [];
    }
    // Define what types of data
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }
    getItems() {
        return [...this.data];
    }
}
// Same function, Union Type approach
class DataStorageUnionType {
    constructor() {
        // This has string and number and boolean array MIX
        this.data = [];
    }
    // Define what types of data
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1); // -1
    }
    getItems() {
        return [...this.data];
    }
}
// Further set the generic type T
const textStorage = new DataStorage();
// From now on, I can only store STRING
textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
function createCourseGoal(title, description, date) {
    // PARTIAL - Makes class properties optional
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}
// Readonly blocks changing of variable
const namesarray = ['Max', 'Anna'];
// namesarray.push['Manu'];
// namesarray.push['Manu'];
/* Decorator */
/* It is a function you apply in certain way */
// function Logger(constructor: Function) {
// console.log('Logging...');
// console.log(constructor);
// }
/* Creating a Decorator Factory */
function Logger(logString) {
    return function (constructor) {
        console.log("Logging...");
        console.log(constructor);
    };
}
// Differen Decorator Factory
function WithTemplate(template, hookId) {
    return function (constructor_original) {
        return class extends constructor_original {
            constructor(..._) {
                super();
                console.log("Rendering Template");
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector("h1").textContent = this.firstName;
                }
            }
        };
    };
}
// @ The thing @ Points at a functino that points to a decorator
// Decorator for a class takes 1 argument
// @Logger
// Decorators execute Bottom Up
let PersonA = class PersonA {
    constructor() {
        this.firstName = "Max";
        console.log("Creating Person");
    }
};
PersonA = __decorate([
    Logger("Logging Person"),
    WithTemplate("<h1>My Person Object</h1>", "app")
], PersonA);
const pers = new PersonA();
// ------
function Log(target, propertyName) {
    console.log("Property decorator");
    console.log(target, propertyName);
}
// ACCESSOR DECORATOR
function Log2(target, name, descriptor) {
    console.log("Accessor Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// METHOD DECORATOR
function Log3(target, name, descriptor) {
    console.log("Method Decorator");
    console.log(target);
    console.log(name);
    console.log(descriptor);
}
// PARAMETER DECORATOR
function Log4(target, name, position) {
    console.log("Parameter Decorator");
    console.log(target);
    console.log(name);
    console.log(position);
}
class Product {
    constructor(t, p) {
        this.title = t;
        this._price = p;
    }
    // Setter for the price
    set price(val) {
        if (val > 0) {
            this._price = val;
        }
        else {
            throw new Error("Invalid Price - should be positive");
        }
    }
    // METHOD DECORATOR
    getPriceWithTax(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "title", void 0);
__decorate([
    Log2
], Product.prototype, "price", null);
__decorate([
    Log3,
    __param(0, Log4)
], Product.prototype, "getPriceWithTax", null);
const p1 = new Product("Book", 12);
const p2 = new Product("Book 2", 29);
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
class Printer {
    constructor() {
        this.message = "This Works!";
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Autobind
], Printer.prototype, "showMessage", null);
const p = new Printer();
const button = document.querySelector("button");
// Vanilla JS Solution
// button.addEventListener('click', p.showMessage.bind(p))
button.addEventListener("click", p.showMessage);
const registeredValidators = {};
// -------------------------
function RequiredText(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "required",
        ] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [
            ...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []),
            "positive",
        ] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    // Go through all the validators you have in the property
    for (const prop in objValidatorConfig) {
        console.log(prop);
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case "required":
                    // Convert to REAL BOOLEAN VALUE - use !!
                    isValid = isValid && !!obj[prop];
                    break;
                case "positive":
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return true;
}
class Course {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    RequiredText
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const titleEl = document.getElementById("title");
    const priceEl = document.getElementById("price");
    const title = titleEl.value;
    const price = +priceEl.value;
    const createdCourse = new Course(title, price);
    console.log(createdCourse);
    if (!validate(createdCourse)) {
        alert("Invalid input, please try again");
        return;
    }
});
/// <reference path="base-component.ts" />
var App;
(function (App) {
    // ProjectItem Class
    class ProjectItem extends App.Component {
        constructor(hostId, project) {
            super("single-project", hostId, false, project.id);
            this.project = project;
            this.configure();
            this.renderContent();
        }
        get persons() {
            if (this.project.people === 1) {
                return "1 person";
            }
            else {
                return `${this.project.people} persons`;
            }
        }
        dragStartHandler(event) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
        dragEndHandler(event) {
            console.log("drag End");
        }
        configure() {
            this.element.addEventListener("dragstart", this.dragStartHandler);
            this.element.addEventListener("dragend", this.dragEndHandler);
        }
        renderContent() {
            this.element.querySelector("h2").textContent = this.project.title;
            this.element.querySelector("h3").textContent = this.persons + " assigned";
            this.element.querySelector("p").textContent = this.project.description;
        }
    }
    __decorate([
        App.Myautobind
    ], ProjectItem.prototype, "dragStartHandler", null);
    App.ProjectItem = ProjectItem;
})(App || (App = {}));
//# sourceMappingURL=bundle.js.map