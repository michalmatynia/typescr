// Arrow Function

const add = (a:number, b: number) => {

  return a+b

}

// Arrow Function = One Expression Version
const addShort = (a:number, b: number) => a+b

// Arrow Function = One Parameter - I can remove Parentheses
const addOneArgs = (a:number) => console.log(a)


// Spread Operator - Array
const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking']

// Array are OBJECTS - OBJECTS are REFERENCE VALUES - We don't change the address when I push, we only change memory
// I can push to const

// add array as a list of individual values

activeHobbies.push(...hobbies)

// OR 
const activeHobbiesTwo = ['Hiking', ...hobbies]

// Spread Operator - Object

const persona = {
  name: 'Max',
  age: 30
}

// This is not a copy, we just copied a pointer to a different space in memory
const instancePerson = persona

// To create a real copy, use Spread operator

const trueCopiedPerson = {...persona}


// REST Parameter

const addrest = (...numbers: number[]) => {

 return numbers.reduce((accum, currentVal)=>{
    return accum + currentVal
  }, 0)

}

const addedNumbers = addrest(4,5,6,7,8,8)

// Destructuring

// 1. Array 
const hobi = ['Hiking', 'Cooking', 'Sleeping']

const [hobby1, hobby2, ...rest] = hobi

// 2. Object
const {age, ...restpersona} = persona