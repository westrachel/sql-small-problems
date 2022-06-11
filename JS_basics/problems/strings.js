// 1. Calculate Average Score Based on User Inputs
// can assume input values are integers
const NUMBER_OF_SCORES = 3;
let total = 0;
let count = 1;

do {
  let string = 'Enter Score ' + String(count) + ':';
  let score = prompt(string);
  let numScore = Number(score);

  if (numScore > 0) {
    total += numScore;
    count += 1;
  } else {
    alert('Please enter your score again with a valid positive integer.')
  }

} while (count < 4);

let avg = total / 3;

function findGrade(avgScore) {
  if (avgScore >= 90) {
    return '"A".';
  } else if (avgScore >= 70) {
    return '"B".';
  } else if (avgScore >= 50) {
    return '"C".';
  } else {
    return '"F".';
  }
}

let MSG_1 = 'Based on the average of your 3 scores your letter grade is '
console.log(MSG_1 + findGrade(avg));

// 2. Pattern Generation
// write a function that takes an integer argument and logs a rectangular
//  shape of incrementing number sequences and stars

// Example:
// generatePattern(7);
// console output
// 1******
// 12*****
// 123****
// 1234***
// 12345**
// 123456*
// 1234567

function generatePattern(num) {
  let nStars = num - 1;
  let endNum = 1;

  while (nStars >= 0) {
    let nums = Array(endNum).fill(1).map((_, number) => number + 1)
    let row =  nums.join('') + '*'.repeat(nStars)

    console.log(row);
    endNum += 1;
    nStars -= 1;
  }
}

generatePattern(10);

// 3. Trimming Spaces
// write a function that returns the front and ending spaces from a string
//   do not remove internal spaces
// approach:
// > initialie an array with -1
// > loop through the string's characters and:
//     > check if each character is a whitespace character or not
//     > if it's not a whitespace than add the character's index position
//         to the index array
// > check if the index array's length is greater than 1
// > if the array's length is greater than 1 then reassign the indices array
//     to an array of 2 values that correspond with the smallest index
//     and largest index of the string that correspond with non-whitespaces
// > return an empty string if the index returned from the function written
//    to handle all previous steps has a length of 1 (that means that the
//     string argument only has whitespaces, so an empty string should be
//     returned)
// > otherwise, return a slice of the string argument of all the characters
//   between the index that corresponds with the first nonspace character
//    and the last nonspace character
function leadingTrailingNonSpaceIndices(string) {
  let indices = [-1];

  for (let index = 0; index < string.length; index += 1) {
    if (!string[index].match(/\s/)) {
      indices.push(index)
    }
  }
  if (indices.length > 1) {
    indices.shift();
    let max = Math.max(...indices) + 1;
    let min = Math.min(...indices);
    indices = [min, max];
  }

  return indices;
}

function trim(string) {
  let indices = leadingTrailingNonSpaceIndices(string);

  if (indices.length === 1) {
    return "";
  } else {
    return string.slice(indices[0], indices[1]);
  }
}

trim('  abc  ');  // "abc"
trim('abc   ');   // "abc"
trim(' ab c');    // "ab c"
trim(' a b  c');  // "a b  c"
trim('      ');   // ""
trim('');         // ""

// 4. Splitting a String
// write a function that logs all substrings of a string that are delimited
// by the second argument that's passed into the function (the first argument
// is the string to find substrings of)
// requirements:
//  > only use brackets and length property
//  > if a second argument isn't supplied log 'ERROR: no delimiter'
//  > do not log the delimiter as part of the substring

// approach:
// > check if the second argument is the default value that's set to the error
//     message & if it is then log that error to the console
// > if the delimiter is an empty string, then iterate through all the characters
//   of the first argument and pass each character as an argument to the console.
//    log call
// > find the index positions of the string that correspond with characters that
//    are equivalent to the delimiter and store all these values in an array
//    > initialize an array to start that contains -1 as the first index delimiter
//        value
//    > loop through the passed in string and compare each character at every index
//        to the delimiter and if there is equivalence then add that character's
//         index to the array of indices
//    > after the loop push to the array the length of the string
// > create an outer loop that will iterate through all the index positions of
//    the array of delimiter indices previously found
//  > for each iteration, initialize a substring variable to an empty string,
//       and initialize a starting substring index and an ending substring index
//       that are equivalent to the integer values of the delimiter Index array
//       located at the current array index being iterated over and the array index
//       directly right adjacent to the current array index
//      > loop through all the characters located at indices between the start index
//         previously found and the ending index previously found and add these
//         characters to a substring
//     > log the substring 
//     > break the outer loop if the ending index is undefined (aka out of bounds), 
//        which means there are no more substrings to find
function delimiterIndices(string, delimiter) {
  let indices = [-1];

  for (let index = 0; index < string.length; index += 1) {
    if (string[index] === delimiter) {
      indices.push(index);
    }
  }

  indices.push(string.length);

  return indices;
}

function splitString(string, delimiter = 'ERROR: No delimiter') {
  let delimIndices = delimiterIndices(string, delimiter);

  if (delimiter === 'ERROR: No delimiter') {
    console.log(delimiter);

  } else if (delimiter === '') {
    for (let index = 0; index < string.length; index += 1) {
      console.log(string[index]);
    }

  } else {
    for (let arrIndex = 0; arrIndex < delimIndices.length; arrIndex += 1) {
      let substring = '';
      let startIndex = delimIndices[arrIndex] + 1;
      let endIndex =  delimIndices[arrIndex + 1];

      if (endIndex === undefined) {
        break;
      }

      for (let index = startIndex; index < endIndex; index += 1) {
        substring += string[index];
      }
    
      console.log(substring);
    }
  }
}

splitString('hello'); // logs: ERROR: No delimiter
splitString('hello', '');
// logs:
// h
// e
// l
// l
// o

splitString('hello', ';');
// logs:
// hello

splitString(';hello;', ';');
// logs:
//  (blank line)
// hello

splitString('abc,123,hello world', ',');
// logs:
// abc
// 123
// hello world

// 5. Repeating a String
// write a function that repeats a string (first argument) the number of times
// specified by the second argument
// requirements:
//   > if second argument is negative or is anything besides a positive integer,
//    return undefined
//   > can only use string concatenation

function repeat(string, times) {
  if (typeof times === "number" && times > 0) {
    let repeatedStr = '';

    for (let counter = 0; counter < Math.round(times); counter += 1) {
      repeatedStr += string;
    }

    return(repeatedStr);
  }
}

repeat('abc', 1);       // "abc"
repeat('abc', 2);       // "abcabc"
repeat('abc', -1);      // undefined
repeat('abc', 'a');     // undefined
repeat('abc', false);   // undefined
repeat('abc', null);    // undefined
repeat('abc', '  ');    // undefined

// 6. String Starts With
// write a function that returns a boolean that specifies whether the first
// string argument starts with the second string argument or not

function startsWith(string, searchString) {
  let numMatches = 0;
  for (let index = 0; index < searchString.length; index += 1) {
    if (string[index] === searchString[index]) {
      numMatches += 1;
    }
  }

  if (numMatches === searchString.length || searchString === '') {
    return true;
  } else {
    return false;
  }
}

let str = 'We put comprehension above all else';
startsWith(str, 'We');              // true
startsWith(str, 'We put');          // true
startsWith(str, '');                // true
startsWith(str, 'put');             // false

let longerString = 'We put comprehension above all else!';
startsWith(str, longerString);      // false

// reactored solution:
function startsWith(string, searchString) {
  for (let idx = 0; idx < searchString.length; idx += 1) {
    if (string[idx] === searchString[idx]) {
      return false;
    }
  }

  return true;
}
