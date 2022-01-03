/* GENERICS - type definition for more complex data fetches*/

/* GENERIC FUNCTIONS */
// Array Generic
const names: Array<string> = []; // string[]
// names[0].split(' ')

// Promise Generic
const promise: Promise<string> = new Promise((resolve, reject) => {
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
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// console.log(merge({name: 'Max'}, {age: 30}));
// Now typescript understand, that it needs to return Intersection
const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj.age);

// Another Generics ============

interface Lengthy {
  length: number;
}
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value";
  if (element.length === 1) {
    descriptionText = "Got 1 element";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements.";
  }
  return [element, descriptionText];
}

console.log(countAndDescribe("Hi there"));

// Handling Dynamic keys
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return "Value: " + obj[key];
}

console.log(extractAndConvert({ name: "Max" }, "name"));

/* GENERIC CLASSES */
// UNION TYPES when I'm flexbile to have a different type with each functional call or class instance creation
// GENERIC TYPES Lock in a one type across function calls
// assign a generic type T
// This has number OR string OR boolean ARRAY, but not all of them
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];
  // Define what types of data

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
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
class DataStorageUnionType{
  // This has string and number and boolean array MIX
  private data: (string | number | boolean)[] = [];
  // Define what types of data

  addItem(item: string | number | boolean) {
    this.data.push(item);
  }

  removeItem(item: string | number | boolean) {
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

const textStorage = new DataStorage<string>();

// From now on, I can only store STRING

textStorage.addItem("Max");
textStorage.addItem("Manu");
textStorage.removeItem("Max");
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

// UTILITY TYPES

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

function createCourseGoal(
  title: string,
  description: string,
  date: Date
): CourseGoal {

  // PARTIAL - Makes class properties optional
let courseGoal: Partial<CourseGoal> = {};
courseGoal.title = title;
courseGoal.description = description;
courseGoal.completeUntil = date;
return courseGoal as CourseGoal;

}

// Readonly blocks changing of variable

const namesarray: Readonly<string[]> = ['Max', 'Anna'];

// namesarray.push['Manu'];
// namesarray.push['Manu'];
