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