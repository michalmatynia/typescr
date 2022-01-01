"use strict";
// Arrow Function
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
//# sourceMappingURL=functiones6.js.map