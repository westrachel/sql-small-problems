// 1. Odd Numbers: 
// write a function to log all odd numbers between 1 & the passed in argument

function logOddNumbers(endpoint) {
  for (let oddNumber = 1; oddNumber <= endpoint; oddNumber += 2) {
   console.log(oddNumber);
  }
}

logOddNumbers(19);

// refactor to check for even numbers and skip all even evaluated numbers
//   using the continue statement

function logOddNumbers(endpoint) {
  for (let oddNumber = 1; oddNumber <= endpoint; oddNumber += 1) {
   if (oddNumber % 2 === 0) {
     continue;
   }
   console.log(oddNumber);
  }
}

// 2. Multiples
// log string values of the multiples of 3 or 5 for integers from 1 to 100
//   and if it's divisible by both add '!' to the number
function multiplesOfThreeAndFive() {
  let num = 1;
  let max = 100;

  while (num <= max) {
    if (num % 3 === 0 || num % 5 === 0) {
      let stringNum = num % 3 === 0 && num % 5 === 0 ? (String(num) + '!') : String(num);
      console.log(stringNum);
    }
    num += 1;
  }
}

// refactor to define a parameter that the function will find multiples of
// only log the multiples if they are also odd
function findLargestMultiplerLtEq100(factor) {
  let largestMultiple = 100;

  while (largestMultiple % factor !== 0) {
    largestMultiple -= 1;
  }

  return largestMultiple;
}

function logMultiples(factor) {
  let multiple = findLargestMultiplerLtEq100(factor);

  while (multiple >= 0) {
    if(multiple % 2 !== 0) {
      console.log(multiple);
    }
    multiple -= factor;
  }
}

logMultiples(17);
// 85
// 51
// 17

// refactored findLargestMultiplerLtEq100 function that doesn't require a loop
function findLargestMultiplerLtEq100(factor) {
  return Math.floor(100 / factor) * factor;
}

// 3. FizzBuzz
// write a function that iterates over integers from 1 to 100 inclusive and logs
// to the console the integer or Fizz for multiples of 3, Buzz for multiples of
// 5 or FizzBuzz for multiples of 3 and 5
function valueToLog(number) {
  if (number % 3 === 0 && number % 5 === 0) {
    return "FizzBuzz"
  } else if (number % 3 === 0) {
    return "Fizz"
  } else if (number % 5 === 0) {
    return "Buzz"
  } else {
    return number
  }
}

function fizzbuzz() {
  let num = 1;
  let max = 100;

  while (num <= max) {
    console.log(valueToLog(num));
    num += 1;
  }
}

fizzbuzz();

// 4. Prime Check
// write a function that returns a boolean based on if the provided argument
// is a prime number or not
// assumption: non-negative input
function isPrime(num) {
  if ([0, 1].includes(num) || (num > 2 && num % 2 === 0)) {
    return false
  }

  let factors = [1, num];
  let factor = 2;

  while (factors.length == 2 && factor < num) {
    if (num % factor === 0) {
      factors.push(factor)
    }
    factor += 1;
  }

  return factors.length > 2 ? false : true
}

isPrime(1);   // false
isPrime(2);   // true
isPrime(3);   // true
isPrime(43);  // true
isPrime(55);  // false
isPrime(0);   // false

// 5. GCD
// Write a function to calc the largest common divisor of 2 integers
// integer inputs are positive
function findFactors(number) {
  let factors = [1, number];
  let potentialFactor = 2;

  while (potentialFactor < number) {
    if (number % potentialFactor === 0){
      factors.push(potentialFactor)
    }
    potentialFactor += 1;
  }

  return factors;
}

function gcd(intOne, intTwo) {
  let factorsOne = findFactors(intOne);
  let factorsTwo = findFactors(intTwo);

  let likeFactors = factorsOne.filter(factor => factorsTwo.includes(factor));
  return Math.max(...likeFactors);
}

gcd(12, 4);   // 4
gcd(15, 10);  // 5
gcd(9, 2);    // 1

// update the function to accept an array of 2 or more numbers
// assumption: arr will contain at least 2 elements
function gcd(arr) {
  let factorsOne = findFactors(arr[0]);
  let factorsTwo = findFactors(arr[1]);
  let index = 2;

  let likeFactors = factorsOne.filter(factor => factorsTwo.includes(factor));
  
  while ((arr.length - 1) >= index) {
    let factors = findFactors(arr[index]);
    likeFactors = likeFactors.filter(factor => factors.includes(factor));
    index += 1;
  }
  return Math.max(...likeFactors);
}

gcd([12, 4, 8]);   // 4
gcd([16, 24, 32]); // 8
gcd([12, 6]);      // 6

// 6. GoldBach Numbers
// write a function that logs every pair of prime numbers that sum to the
// number supplied as an argumnet
// other requirements:
//  > log all pairs with the smallest numbe first
//  > if the argumnet is odd or less than 4 log null

// approach:
// > immediately return null if the passed in argument is less
//    than 4 or if it has a remainder when divided by 2 (which
//     proves it's an odd number)
// > 2 is the smallest prime number, so declare and initialize
//     a local variable to 2
// > start a loop construct and check that the local variable previously
//    initialized is <= half the size of the passed in argument
//     > b/c finding pairs that sum to the passed in argument,
//        only need to increment up to half of the passed in argument
//     > b/c this will be in an else branch and we already captured
//        logic for what to do when evaluating an odd sum, there is an
//        integer halfway point
// > in the loop declare another local variable that will sum with the other
//      local variable to the value of the argument passed into the function
// > check if both of the local variables are prime numbers using previously
//     defined isPrime() function
//     > if they are, then log their values
// > increment one of the local variables by 1 (the local variable that is
//      used to derive the other local variable's value through subtraction
//      needs to be incremented)
function checkGoldbach(expectedSum) {
  if (expectedSum < 4 || expectedSum % 2 !== 0) {
    console.log(null);
  } else {
    let num = 2;

    while (num < (expectedSum / 2 + 1)) {
      let addend = expectedSum - num;
      
      if (isPrime(num) && isPrime(addend)) {
        console.log(String(num) + ' ' + String(addend));
      }

      num += 1;
    }
  }
}

checkGoldbach(4);
// 2 2

checkGoldbach(100);
// 3 97
// 11 89
// 17 83
// 29 71
// 41 59
// 47 53


// 7. Convert strings to integers
// requirements:
// > can assume only numeric input
// > can assume not decimlals
// > don't need to worry about leading + / - sign
//     <=> so only positive strings in scope

// approach for finidng multiplier:
  // if length is 1, then multiplier is 1
  // if length is 2, then multiplier is 10
  // if length is 3, then multiplier is 100
  // if length is 4, then multiplier is 1000
  // if length is n, then multiplier is 10^(n - 1)
function stringToInteger(string) {
  const STRING_TO_NUM = {
    '0': 0, '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
    '6': 6, '7': 7, '8': 8, '9': 9
  }
  
  let total = 0;
  let exponent = string.length - 1;

  for (let index = 0; index < string.length; index += 1) {
    let multiplier = Math.pow(10, exponent);

    total += STRING_TO_NUM[string[index]] * multiplier;
    exponent -= 1;
  }
  
  return total;
}

stringToInteger('4321');      // 4321
stringToInteger('570');       // 570

// 8. Convert A String to A Signed Number
function stringToSignedInteger(string) {
  let sign = string[0];

  if (sign === '+') {
    return stringToInteger(string.slice(1, string.length));
  } else if (sign === '-') {
    return -1 * stringToInteger(string.slice(1, string.length));
  } else {
    return stringToInteger(string);
  }

}

stringToSignedInteger('4321');      // 4321
stringToSignedInteger('-570');      // -570
stringToSignedInteger('+100');      // 100

// 9. Convert a Number to a String
// can assume a positive integer or 0 as an intput
function reverse(string) {
  return string.split('').reverse().join('');
}

function integerToString(integer) {
  const NUM_TO_STRING = {
    0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5',
    6: '6', 7: '7', 8: '8', 9: '9'
  }

  let numberString = '';

  do {
    let remainder = integer % 10;
    integer = Math.floor(integer / 10);

    numberString += NUM_TO_STRING[remainder];
  } while (integer > 0);

  return reverse(numberString);
}

integerToString(4321);      // "4321"
integerToString(0);         // "0"
integerToString(5000);      // "5000"
