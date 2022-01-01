"use strict";
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
//# sourceMappingURL=interface.js.map