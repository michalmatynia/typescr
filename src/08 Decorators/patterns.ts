/* Decorator */

/* It is a function you apply in certain way */

// function Logger(constructor: Function) {
// console.log('Logging...');
// console.log(constructor);

// }
/* Creating a Decorator Factory */
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log("Logging...");
    console.log(constructor);
  };
}

// Differen Decorator Factory
function WithTemplate(template: string, hookId: string) {
  return function <T extends { new (...args: any[]): { firstName: string } }>(
    constructor_original: T
  ) {
    return class extends constructor_original {
      constructor(..._: any[]) {
        super();

        console.log("Rendering Template");

        const hookEl = document.getElementById(hookId);
        if (hookEl) {
          hookEl.innerHTML = template;
          hookEl.querySelector("h1")!.textContent = this.firstName;
        }
      }
    };
  };
}
// @ The thing @ Points at a functino that points to a decorator
// Decorator for a class takes 1 argument
// @Logger

// Decorators execute Bottom Up
@Logger("Logging Person")
@WithTemplate("<h1>My Person Object</h1>", "app")
class PersonA {
  firstName = "Max";

  constructor() {
    console.log("Creating Person");
  }
}

const pers = new PersonA();

// ------
function Log(target: any, propertyName: string | Symbol) {
  console.log("Property decorator");
  console.log(target, propertyName);
}
// ACCESSOR DECORATOR
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log("Accessor Decorator");
  console.log(target);

  console.log(name);
  console.log(descriptor);
}
// METHOD DECORATOR
function Log3(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  console.log("Method Decorator");
  console.log(target);

  console.log(name);
  console.log(descriptor);
}
// PARAMETER DECORATOR
function Log4(target: any, name: string | Symbol, position: number) {
  console.log("Parameter Decorator");
  console.log(target);

  console.log(name);
  console.log(position);
}
class Product {
  // Property Decorator - receives 2 arguments
  // Property Decorator exectues when class definition is registered by Javascript
  @Log
  title: string;
  private _price: number;

  // Setter for the price
  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error("Invalid Price - should be positive");
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  // METHOD DECORATOR
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product("Book", 12);
const p2 = new Product("Book 2", 29);

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
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
  message = "This Works!";

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();

const button = document.querySelector("button")!;

// Vanilla JS Solution
// button.addEventListener('click', p.showMessage.bind(p))

button.addEventListener("click", p.showMessage);

// Validation Decoraor ----
interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {};

// -------------------------

function RequiredText(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // It would be better to extract existing validators and then assign this one to the existing ones
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "required",
    ],
  };
}

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // It would be better to extract existing validators and then assign this one to the existing ones
    ...registeredValidators[target.constructor.name],
    [propName]: [
      ...(registeredValidators[target.constructor.name]?.[propName] ?? []),
      "positive",
    ],
  };
}

function validate(obj: any) {
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
  @RequiredText
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!;

courseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const titleEl = document.getElementById("title") as HTMLInputElement;
  const priceEl = document.getElementById("price") as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  console.log(createdCourse);

  if (!validate(createdCourse)) {
    alert("Invalid input, please try again");

    return;
  }
});
