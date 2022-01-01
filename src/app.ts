/* INTERSECTION TYPES */

// type Admin = {
//     firstName: string;
//     privileges: string[]
// };

// type Employee = {
//     firstName: string;
//     startDate: Date;
// };

// // Merge Object types
// type ElevatedEmployee = Admin & Employee

// const el : ElevatedEmployee = {
//     firstName: 'Max',
//     privileges: ['create-server'],
//     startDate: new Date()
// }

/* Decalre the same through Interface */
interface Admin {
    firstName: string;
    privileges: string[]
};

interface Employee{
    firstName: string;
    startDate: Date;
};

interface ElevatedEmployee extends Employee, Admin {

}

// Merge Object types
// type ElevatedEmployee = Admin & Employee

const el : ElevatedEmployee = {
    firstName: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}


// Another Intersection Type Example
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric


/* TYPE GUARDS */

 function addTyp(a: Combinable, b: Combinable) {
         // Type Guard - typeof - GOOD FOR EVERYTHING

    if (typeof a === 'string' || typeof b === 'string') {
      return a.toString() + b.toString();
    }
    return a + b;
  }
  
  type UnknownEmployee = Employee | Admin;

// 'in' TYPE GUARD - GOOD FOR OBJECTS

 function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.firstName);

         // Type Guard for internal Class property

    if ('privileges' in emp) {
      console.log('Privileges: ' + emp.privileges);
    }
    if ('startDate' in emp) {
      console.log('Start Date: ' + emp.startDate);
    }
  }

printEmployeeInformation({firstName: 'Steve', startDate: new Date()})

 // Instance of Type Guard Class - GOOD FOR INSTANCES

 class Car {
     drive(){
         console.log('Driving...');
         
     }

 }

 class Truck {
    drive(){
        console.log('Driving...');
        
    }
    loadCargo(amount: number) {
        console.log('Loading amount...' + amount);
        
    }
}

 type Vehicle = Car | Truck;

 const v1 = new Car()
 const v2 = new Truck()

 function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    
    // Instance of Type Guard
    if(vehicle instanceof Truck) {

        vehicle.loadCargo(1000)
    }
 }

 useVehicle(v1)
 useVehicle(v2)

 /* DISCRIMINATED UNION */
 interface Bird {
     kind: 'bird'; // Literal Type for Discriminated Union
     flyingSpeed: number;
 }

 interface Horse { 
    kind: 'horse'; // Literal Type for Discriminated Union
     runningSpeed: number;
 }

 type Animal = Bird | Horse;

 function moveAnimal(animal: Animal) {
    let speed; 
    
    switch(animal.kind) {
         case 'bird':
             speed = animal.flyingSpeed;
             break
             case 'horse':
                 speed = animal.runningSpeed;
     }

     console.log('Moving Speed: ' + speed);
     
 }

 moveAnimal({kind: 'bird', flyingSpeed: 10})

 /* TYPE CASTING */

 // Version 1
 const userInputElement = <HTMLInputElement>document.getElementById('user-input')! // I need to signify, that's it's HTML INPUT ELEMENT

 userInputElement.value = 'Hi there !'

 // Version 2 for React 

 const userInputElement2 = document.getElementById('user-input')! as HTMLInputElement // I need to signify, that's it's not UNDEFINED AND  HTML INPUT ELEMENT
 userInputElement2.value = 'Hi there !'

  // Version 3 for React , to avoid exclamation mark (if unsure whether the value if undefined)

  const userInputElement3 = document.getElementById('user-input') as HTMLInputElement // I need to signify, that's it's not UNDEFINED AND  HTML INPUT ELEMENT
  
  if(userInputElement3) {

      (userInputElement3 as HTMLInputElement).value = 'Hi there !'
  }


  // FEATURES THAT HELP US WRITE BETTER CODE

interface ErrorContainer{
    // { email: 'Not a valid email', username: 'Must start'}

    id: string;
    // index type
    // for example property names need to be string, 
    [prop: string]: string
}

const errorBag: ErrorContainer = {
    id: 'some id',
    email: 'some string',
    username: 'Must start with a letter'
}

// FUNCTION OverLoads
// I'm being more specific for my result and input, because I have if
function addTypOverload(a: number, b: number): number;
function addTypOverload(a: string, b: string): string;
function addTypOverload(a: Combinable, b: Combinable) {

if (typeof a === 'string' || typeof b === 'string') {
 return a.toString() + b.toString();
}
return a + b;
}

const result = addTypOverload('Max', 'Schwarz')

result.split(' ')

// OPTIONAL CHAINING
const fetchedUserData = {
    id: 'u1',
    firstName: 'Max',
    job: {title: 'CEO', description: 'job description'}

}

// OPTIONS CHaining !
console.log(fetchedUserData.job && fetchedUserData.job.title);

// In Typescript I have an even better way of Checking
console.log(fetchedUserData?.job?.title);


// NULLISH COALESCING
const userInput = '';

const storedData = userInput ?? 'DEFAULT'; // If this is null or and undefined, print even if it's an empty string (doesn't treat empty string as falsy)
