

/* CUSTOM FUNCTION TYPES & INTERFACES*/
// Define Function by interface
interface AddFn2 { 
(a: number, b: number): number;
}
// Define Function by type
type AddFn = (a:number, b: number) => number

let addd: AddFn2;

addd = (n1: number, n2: number) => {
  return n1 + n2
}

// Interface - Describes the structure of the Object
// Just define the structure, not the particular values.
// I can use type Persone instead of interface Person

interface Named {
  // readonly - I can only assign property once
  readonly firstName?: string;
  
  // Mark Optional property
  outputName?: string
}
// second interface

// I can inherit many interfaces, but only one classes
// interface Greetable extends Named, SomeOtherInterface {

interface Greetable extends Named {
  age: number;

  greet(phrase: string): void;
}

class Person implements Greetable {

  // Class Property can also by optional, by adding ?
  firstName?: string;
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.firstName = n;

    }
  }

  greet(phrase: string) {

    if (this.firstName) {
      console.log(phrase + " " + this.firstName);

    } else {
      console.log('Hi')
    }
  }
}

// I can use interface as a Type
let user1: Greetable;

user1 = new Person();

user1 = {
  firstName: "Max",
  age: 30,
  greet(phrase: string) {
    console.log(phrase + " " + this.firstName);
  },
};
