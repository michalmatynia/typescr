let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Maff'

if(typeof userInput === 'string') {
    userName = userInput;
}

function generateError (message: string, code: number) : never{
    // Produces never because throw breaks the code
    throw {message: message, errorCode: code};
}

generateError('An error occured', 500)