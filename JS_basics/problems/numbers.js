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