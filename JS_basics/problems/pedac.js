// Problem: Phone Number Parsing
// requirements:
// > if a given phone number is < 10 digits, it's invalid
// > if a given phone number is 10 digits, it's valid
// > if a given phone number is 11 digits:
//      > & the first digit is 1, then use the lst 10 digits
//      > & the first digit is not 1, then it's invalid
// > if a given phone number is > 11 digits, then it's invalid

// Data:
// input:
// > string number that consist of digits and special characters
//    > special characters include spaces, dashes, dots, and parentheses
// output:
// > if the given input is deemed invalid then return a string of 10 0s
// > return the 10 digit string phone number

// assumptions:
// > function will only be passed string inptus that contain one 'phone number'

// Algorithm:
// i. Check if the passed in string matches the regex pattern for exactly
//    10 character digits where the digits are string numbers 0 - 9
//        > if evaluates as true, then return the string number itself
// ii. check if the length of the string is < 10 digits or greater than 11 digits
//         > check the length property
//         > if either condition evaluates as true, then return a string with 10 zeros
// iii. check if the first element is equivalent to '1' (if prior branch wasn't evaluated
//         then the given string is exactly 11 digits)
//       > also check that the digits at the 1st index position through the 10th index
//           position are all string numbers 
//       > if both conditions evaluate as true, then return all the characters of the
//          given string except for the element at the zeroth index 
// iv. if none of the prior conditions evalaute as true, then return a string that contains
//   10 zeros
function tenDigits(string) {
  return string.match(/\b\d{10}\b/);
}


function prepCellNumber(str) {
  const INVALID_NUM = '0'.repeat(10);

  if (tenDigits(str)) {
    return str;
  } else if (str[0] === '1' &&
             str.length === 11 &&
             tenDigits(str.substring(1, 11))) {
    return str.substring(1, 11);
  } else {
    return INVALID_NUM;
  }
}


// Test Cases:
prepCellNumber('34523');         // '0000000000'
prepCellNumber('');              // '0000000000'
prepCellNumber('234ab');         // '0000000000'
prepCellNumber('34*232_012');    // '0000000000'
prepCellNumber('3452320012');    // '3452320012'
prepCellNumber('345232001233');  // '0000000000'
prepCellNumber('14523200123');   // '4523200123'
prepCellNumber('24523200123');   // '0000000000'

// Problem:
// requirements:
// > to spell a word, you can only use 1 letter from each letter block
// > you can only use each block 1x, so there should only be 1 instance
//     of each letter selected from a respective block
// > letters are case-insensitive 

// Data:
// input:
//  > assuming input will only be a string
// output:
//   > boolean that indicates if the word string argument can be spelled
//      w/ the given letter blocks

// Algorithm:
// i. create an object that stores each letter block as a key and an initial
//    count of the number of occurences of those letters as a value, so the initial
//    values should all be 0
//      <=> store the 2 letters concatenated as each key and exclude the colon
// ii. iterate through the characters of the string argument and check if they
//     are non-alphabetical and if they aren't then return false
//      > use for loop here to allow for ending early
// iii. uppercase the character being iterated over and find the corresponding
//      key that contains that uppercase character
//       > obtain an array of the keys of the object
//       > filter through the keys that are all unique letter pairs and select
//          the key that contains the uppercased character being iterated over
//     Object.keys(myObj).filter(letterPair => letterPair.includes(letter))
// iv.  add 1 to the value associated with that key
// v. check if the value exceeds 1 after the addition and if it does, return false
// vi. if haven't returned false, then return true

function isBlockWord(string) {
  let letterPairCounts = {
    'BO': 0, 'XK': 0, 'DQ': 0, 'CP': 0, 'NA': 0, 'GT': 0,
    'RE': 0, 'FS': 0, 'JW': 0, 'HU': 0, 'VI': 0, 'LY': 0,
    'ZM': 0,
  };
  let chars = string.split('');

  if (chars.length === 0) {
    return false;
  }

  for (let idx = 0; idx < chars.length; idx += 1) {
    let char = chars[idx].toUpperCase();

    if (!char.match(/[A-Z]/)) {
      return false;
    } else {
      let key = Object.keys(letterPairCounts).filter(
        letterPair => letterPair.includes(char));
      
      letterPairCounts[key] += 1;
      
      if (letterPairCounts[key] > 1) {
        return false;
      }
    }
  }

  return true;
}

// Test Cases:
isBlockWord('BATCH');        // true
isBlockWord('BBATCH');       // false
isBlockWord('BUTCH');        // false
isBlockWord('jest');         // true
isBlockWord('');             // false
isBlockWord('--*batch');     // false
isBlockWord('  ');           // false


// Problem:
// write a function that sorts an array based on an english word lookup

// requirements:
// > don't mutate the argument
// > sorting logic:
//     > sort alphabetically from a - z & by length so 'eight' should come
//        before 'eighteen'

// assumptions:
// > will only be given an array of numbers 0 through 19

// test case notes:
// > 8 is returned first in the first test case, and 'e' is the starting
//    letter that appears before any other starting letter of the english
//    word conversions of the given numbers in the array

// Data:
// > input: array of numbers, specifically integers 0 - 19
// > output: a new array of integers that corresponds w/ the inputted
//    array sorted based on the english word

// Algorithm:
// i. create an object constant where each key is a string integer 0 - 19
//    and each associated value is the english word of that string integer
// ii. iterate over the integers in the array argument and map each one to
//      the corresponding english word by first converting the number in the
//       array to a string 
// iii. sort the mapped array based on comparing the strings
//    string comparison w/ the < & > operators naturally follows the sorting
//     logic required implicitly by the test case
// iv. iterate over the sorted array of words and map each english word to 
//   the corresponding number integer using object key/value lookups
//    > find the key associated with the given value and convert that key
//      to a number

function alphabeticNumberSort(array) {
  const STR_TO_WORD = { '0': 'zero', '1': 'one', '2': 'two', '3': 'three',
    '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', 
    '9': 'nine', '10': 'ten', '11': 'eleven', '12': 'twelve', '13': 'thirteen',
    '14': 'fourteen', '15': 'fifteen', '16': 'sixteen', '17': 'seventeen',
    '18': 'eighteen', '19': 'nineteen',
  };

  let words = array.map(num => STR_TO_WORD[String(num)]);
  
  return words.sort(compareWords).map(word => 
    findKey(STR_TO_WORD, word));
}

function findKey(obj, value) {
  let keys = Object.keys(obj);

  for (keys in obj) {
    if (obj[keys] === value) {
      return Number(keys);
    }
  }

}

function compareWords(word1, word2) {
  if (word1 < word2) {
    return -1;
  } else if (word1 > word2) {
    return 1;
  }

  return 0;
}

// Test Cases:
alphabeticNumberSort(
   [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]);
// [8, 18, 11, 15, 5, 4, 14, 9, 19, 1, 7, 17, 6, 16, 10, 13, 3, 12, 2, 0]

//zero, one, two, three, four, five, six, seven, eight, nine, ten, eleven, 
//twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen

alphabeticNumberSort([1, 2, 3]);
// [1, 3, 2]
// one, three, two


// Problem:
// find all multiplicative pairs
// reqs:
// > the array returned should be sorted from smallest number
//    to largest
// > neither argument will be an empty array
// > the arrays will only contain numbers

// Data:
// input: 2 array arguments that contain numbers
// output: new array that contains the product of all possible number combinations
//    of the provided array arguments
//   <=> the should be sorted in ascending numerical order

// Algorithm:
// i. iterate over one of the arrays
// ii. with each iteration:
//      > iterate over all the elements of the other array argument
//      > multiply each numerical element being iterated over
//      > push the product to a new array
// iii. sort the new array created from largest to smallest
// iv. return the sorted array
function multiplyAllPairs(arr1, arr2) {
  let products = [];

  arr1.forEach(num1 => {
    arr2.forEach(num2 => {
      products.push(num1 * num2);
    });
  });

  return products.sort((num1, num2) => num1 - num2);
}

// Test Cases:
multiplyAllPairs([2, 4], [4, 3, 1, 2]);    // [2, 4, 4, 6, 8, 8, 12, 16]
multiplyAllPairs([2, 2], [1, 1]);          // [2, 2, 2, 2]


// Problem:
// find the sum of sums of all subsequences 
// requirements:
// > subsequence:
// ex. [3, 5, 2] has the following subsequences:
//   (3) + (3 + 5) + (3 + 5 + 2)

// Data:
// input: argument will be a single array of numbers only <=> at least 1 number
// output: a number that represents the sum of sequences 

// Algorithm:
// i. declare a length variable that initially points to 1
// ii. declare a final length variable that points to the number associated with
//    the length property of the array argument
// iii. establish a for loop that will continue iterating until the number that the
//    length variable points to is equivalent to the final length variable
// iv. on each iteration:
//       > add 1 to the number that the length variable points to
//       > slice the array argument from the 0th index and pass in the
//           length variable's current value as the 2nd argument
// v. sum the number elements of the sliced array and add it to a running total value
//     that represents the sum of sums of each sequence
// vi. return the running total sum

function sumOfSums(array) {
  let finalLength = array.length;
  let sum = 0;

  for (let length = 1; length <= finalLength; length += 1) {
    sum += array.slice(0, length).reduce(
      (total, value) => total + value);
  }

  return sum;
}
sumOfSums([3, 5, 2]);        // (3) + (3 + 5) + (3 + 5 + 2) --> 21
sumOfSums([1, 5, 7, 3]);     // (1) + (1 + 5) + (1 + 5 + 7) + (1 + 5 + 7 + 3) --> 36
sumOfSums([4]);              // 4
sumOfSums([1, 2, 3, 4, 5]);  // 35

// 1000 lights
// > there's a bank of switches numbered from 1 to n
// > Every switch ties to 1 light that is initially off
// > on the first pass through the switches all of them
//    are toggled
// > on the second pass, only the even numbered (not indexed)
//      position switches are toggled (so 2nd switch, 4th switch,
//      6th switch)
// > on the third pass, switches 3, 6, 9, etc are toggled
// > the toggling process is repeated for n repetitions, where
//      n is the argumnet passed into a function

// Data: 
// input: number that represents the number of switches and
//    the number of repetitions of toggling switches
// assumptions: integer input that is > 0
// output: array of lights that are on after n repetitions

// data structure to store light status + light #
// let lights = {
//  '1': 'off';
//  '2': 'off';
//  ...
// }

// iteraton pattern:
// > toggle every light, so the incrementer would be 1 and
//    start toggling the first light
// > incrementer becomes 2 on 2nd iteration and toggle 2, 4, 6
// > incrementer becomes 3 on 3rd iteration and toggle 3, 6, 9

// Algorithm:
// i. declare and initialize an incrementer that starts a 1
// ii. declare and initialize an object whose keys are string
//     numbers starting from 1 and going up to and including 
//     the integer n argument <=> these are the light numbers
//      > assign each key's value as 'off'
// iii. iterate from 1 to n and on each iteration:
//      > iterate through all the keys in the lights object
//      > toggle the light numbers' values to their opposite value
//          so 'on' becomes 'off' and 'off' becomes 'on'
//          <=> only toggle the light numbers keys' values where
//            the key's string number converted to a number type is
//            a multiple of the incrementer
//      > add 1 to the incrementer after
// iv. filter the object's keys to only the keys that have associated
//       values equal to 'on'
// v. map the selected keys to numbers and return the array of numbers
function lightsOn(numLights) {
  let switchNums = [...Array((numLights + 1)).keys()].slice(1);
  let switches = createLightsObj(switchNums);
  
  switchNums.forEach(
    num => switches[String(num)] = 'off');
  
  switchNums.forEach(switchNum => {
    for (let strNum in switches) {
      if (Number(strNum) % switchNum === 0) {
        switches[strNum] = switches[strNum] === 'on' ? 'off' : 'on';
      }
    }
  });

  return filterObjKeysByValue(switches, 'on');
}

function createLightsObj(keys) {
  let obj = {};
  
  keys.forEach(num => obj[String(num)] = 'off');
  return obj;
}

function filterObjKeysByValue(obj, desiredValue) {
  let selectedKeys = [];

  for (let property in obj) {
    if (obj[property] === desiredValue) {
      selectedKeys.push(Number(property));
    }
  }

  return selectedKeys;
}

// test cases:
lightsOn(5);        // [1, 4]
// Detailed result of each round for `5` lights
// Round 1: all lights are on
// Round 2: lights 2 and 4 are now off;     1, 3, and 5 are on
// Round 3: lights 2, 3, and 4 are now off; 1 and 5 are on
// Round 4: lights 2 and 3 are now off;     1, 4, and 5 are on
// Round 5: lights 2, 3, and 5 are now off; 1 and 4 are on

lightsOn(100);      // [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

// Problem:
// write a function that logs a four-pointed diamond in an n x n grid

// Data:
// input: an odd integer n 
//    > can assume only odd integers

// pattern based on test cases:
//  first row always has 1 star
//  next row has prior row's # of stars + 2
// ...
//  middle row has the integer argument # of stars
// ...
// increment backwards until log 1 star

// Algorithm:
// i. declare a rows variable that points to an empty array
// ii. iterate from 1 to the integer argument and on each iteration:
//     > push a string to the rows variable where the string is created
//       by concatenating a number of spaces with *s where there are
//         numStars number of stars and then a number of spaces to
//         the right of the stars
//     numLeftSpaces = (integer argument - numStars ) / 2
//     numRightSpaces = numLeftSpaces
//     row = ' '.repeat(numLeftSpaces) + '*'.repeat(umStars) + ' '.repeat(numRightSpaces)
// iii. iterate through the rows array and log each string element (a row
//     of the n x n grid) to the console
// iv. reverse the rows array and remove the first element (middle row w/ only stars)
// v. iterate through the reversed array's remaining elements and log to the console
//    each of the elements
function diamond(n) {
  let rows = [];
  let numStars = [...Array(n+1).keys()].slice(1).filter(
    num => num % 2 !== 0);

  numStars.forEach(num =>
    rows.push(createDiamondRow(num, n)));

  rows.forEach(printRow);
  rows.reverse().slice(1).forEach(printRow);
}

function createDiamondRow(numStars, length) {
  let numSpaces = (length - numStars ) / 2;
  let spaces = ' '.repeat(numSpaces);
  return spaces + '*'.repeat(numStars) + spaces; 
}

function printRow(row) {
  console.log(row);
}

// test cases:
diamond(1);
// logs
// *

diamond(3);
// logs
//  *
// ***
//  *

diamond(9);
// logs
//    *
//   ***
//  *****
// *******
//*********
// *******
//  *****
//   ***
//    *


// Problem:
// write a function that implements the Caesar Cipher
// > Caesar Cipher: substitutes a letter by another letter located a given number of positions away in the alphabet
// Ex: letter 'A' is right-shifted by 3 spots, it's substituted with the letter 'D'
//    <=> the specific shift value is the 'key'

// requirements:
// > only encrypt letters (including both lower + upper case)
// > Any other character is left as is
// > The substituted letters are in the same letter case as the original letter
// > If the key value for shifting exceeds the length of the alphabet, it wraps around from the beginning

// Data:
// > input: string first argument, that is the string to be encrypted & a numerical key value that
//    represents the number of positions to shift the given letters by
// <=> assuming 2nd argument can be negative or positive, but will be a number
// > output: encrypted string

// Algorithm:
// i. declare an array that contains all alphabetical letters a - z <=> put this in a helper method that
//     defines either an array of all uppercased or all lower cased letters based on an argument passed to
//     the method
//   > a is located at the 0th index, b is located at the first index, ..., z is located at the 25th index
//   > array's case should be uniform
// ii. 
// iii. iterate through the given string and translate the characters as necessary
//      > to check if the character being iterated over does need to be translated, check if it's an
//          alphabetical letter or not
//      > if it's not an alphabetical letter, return the character as is to the new string that will
//          hold the translated letters
// iv. if the character is an alphabetical lettr, then find it's index position in the array previusly
//      declared
//       > select the array that has the appropriate case for the letter
// v. add the 2nd argument's numerical value to the letter's index position
// vi. check if the result of the addition is greater than 25 or less than 0
//      > if the result of the addition is greater than 25, then find the difference between
//         the summation and 25 and subtract 1 to find the index position of the shifted
//         new character
//         ex: letter is "X" which has index position of 23 and 2nd argument is 3
//            summation = 3 + 23 = 26
//            new index = 26 - 25 - 1 = 0
//              x, y, z, a, b 
//      > if the result of the addition is less than 0, then add that negative difference
//          to 25 and add 1 and that will be the index of the shifted character
//         ex: letter 'C' will have index position 2 and the 2nd numerical argument is -5
//              difference = 2 + (-5) = -3 
//              new index = 25 + (-3) + 1 = 23
//               x, y, z, a, b, c
// vii. use the index position of the new character found in the prior step to subset the desired
//    character from the appropriately cased array
// viii. push the subsetted character to the new string holding translated letters
// ix. return the new string created with all shifted characters
function caesarEncrypt(str, num) {
  num = decrementNumericalShifter(num);

  return str.split('').map(char => {
    if (!char.match(/[A-Z]/i)) {
      return char;
    } else if (char.match(/[A-Z]/)) {
      return rotateLetter('uppercase', num, char);
    } else {
      return rotateLetter('lowercase', num, char);
    }
  }).join('');
}

function decrementNumericalShifter(num) {
  if (num > 26) {
    while (num > 26) {
      num -= 26;
    }
  } else if (num < -26) {
    while (num < -26) {
      num += 26;
    }
  }

  return num;
}

function rotateLetter(letterCase, n, letter) {
  const ABCS = casedAlphabet(letterCase);
  let currIdx = ABCS.indexOf(letter);
  let newIdx = currIdx + n;

  if (newIdx > 25) {
    newIdx = newIdx - 25 - 1;
  } else if (newIdx < 0) {
    newIdx = newIdx + 25 + 1;
  }

  return ABCS[newIdx];
}

function casedAlphabet(upperCaseFlag) {
  const ABCS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H',
    'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S',
    'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  if (upperCaseFlag === 'uppercase') {
    return ABCS;
  } else {
    return ABCS.map(letter => letter.toLowerCase());
  }
}


// Test Cases:
// simple shift
caesarEncrypt('A', 0);       // "A"
caesarEncrypt('A', 3);       // "D"
caesarEncrypt('C', -5);     // "X"
caesarEncrypt('X', 3);      // "A"
caesarEncrypt('C', -31);     // "X"

// wrap around
caesarEncrypt('y', 5);       // "d"    <=> "y", "z", "a", "b", "c", "d"
caesarEncrypt('a', 47);      // "v"
caesarEncrypt('a', 73);      // "v"

// all letters
caesarEncrypt('ABCDEFGHIJKLMNOPQRSTUVWXYZ', 25);
// "ZABCDEFGHIJKLMNOPQRSTUVWXY"

caesarEncrypt('The quick brown fox jumps over the lazy dog!', 5);
// "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl!"


// many non-letters
caesarEncrypt('There are, as you can see, many punctuations. Right?; Wrong?', 2);
// "Vjgtg ctg, cu aqw ecp ugg, ocpa rwpevwcvkqpu. Tkijv?; Ytqpi?"
