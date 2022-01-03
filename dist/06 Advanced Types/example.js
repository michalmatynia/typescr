"use strict";
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
//# sourceMappingURL=example.js.map