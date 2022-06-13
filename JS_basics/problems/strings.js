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

// 7. Converting String to Lowercase via ASCII table lookups
// approach:
// > initialize an empty lower case string (to be returned by the function)
// > iterate through each of the characters in the string argument
// > based on the ascii table, uppercase letters have numeric codes ranging
//  from 65 - 90, so if the numeric conversion of a given character is
//  outside of that range, then push the character of the string being
//  iterated over as is to the lower case string; otherwise push the
//  lower case version of the string using the ascii table numeric conversion

function toLowerCase(string) {
  const CONVERSION_REQ_UPPER_BOUND = 90;
  const CONVERSION_REQ_LOWER_BOUND = 65;
  const ASCII_CONVERSION_ADDEND = 32;
  let lowerCaseStr = '';

  for (let index = 0; index < string.length; index += 1) {
    let asciiNum = string.charCodeAt(index);

    if (asciiNum >= CONVERSION_REQ_LOWER_BOUND && asciiNum <= CONVERSION_REQ_UPPER_BOUND) {
      asciiNum += ASCII_CONVERSION_ADDEND;
      lowerCaseStr += String.fromCharCode(asciiNum);
    } else {
      lowerCaseStr += string[index];
    }
  }

  return lowerCaseStr;
}

toLowerCase('ALPHABET');  // "alphabet"
toLowerCase('123');       // "123"
toLowerCase('abcDEF');    // "abcdef"

// 8. Substring Pt 1
// write a function that returns a substring based on subsetting the given 
// string w/ the index & length arguments

// requirements:
// > negative lengths are possible but should return an empty string in those
//    cases
// > length can be greater than the string's length, but there should be no
//    circular looping over the string to account for the longer length argument
//    <=> just return a substring that goes until the end of the given string
//       if the length argument exceeds the length of the given string

// approach:
// > assign a starting index variable that is equal to the 2nd argument unless the
//   2nd argument is negative, in which case the variable should equal the 2nd
//   argument plus the 1st string argument's length
// > find the ending index of the substring
//    > need to cap the ending index at the largest index available, which is found
//       by substracting 1 from the string's length
//    > the ending index, if not capped, should be equal to the index variable's value
//       previously found plus the length 3rd argument passed in minus 1
// > initialize a variable whose value is an empty string
// > iterate through the characters in the string starting from the index position that
//    corresponds with the index variable's integer value to the index position that
//    corresponds with the ending index variable's value
//     > on each iteratin push the string argument's character at the current index
//        position to the substring
function substr(string, start, length) {
  let index = (start < 0 ? string.length + start : start);
  let endIndex = Math.min(...[index + length - 1, string.length - 1]);
  let substring = '';

  while (index <= endIndex) {
    substring += string[index];
    index += 1;
  }

  return substring;
}

substr('hello world', 2, 4);     // "llo "
substr('hello world', -3, 2);    // "rl"
substr('hello world', 8, 20);    // "rld"
substr('hello world', 0, -20);  // ""
substr('hello world', 0, 0);    // ""

// 9. Substring Pt 2
// write a function that returns a substring of the given string argument
// requirements:
// > if start & end arguments are positive & start < end & both indices are
//     in bounds for the given string, then return the substring from the
//     [start index, end index)
// > if start > end, then return the string [end index, start index)
// > if start === end, return an empty string
// > if end argument isn't provided then return the substring from the start
//    index through to the end of the string
// > if start or end are less than 0 or isn't a number then treat them as 0
// > if start or end are greater than the length of the string, treat them as
//     equal to the string length

function prepIndex(length, index) {
  if (index > length || index === undefined) {
    return length;
  } else if (index < 0 || typeof index !== "number") {
    return 0;
  } else {
    return index;
  }
}

function substring(string, start, end) {
  let startIdx = prepIndex(string.length, start);
  let endIdx = prepIndex(string.length, end);

  let trueStart = Math.min(...[startIdx, endIdx]);
  let trueEnd = Math.max(...[startIdx, endIdx]);

  if (trueStart !== trueEnd) {
    return string.slice(trueStart, trueEnd);
  } else {
    return "";
  }

}

substring('hello world', 2, 4);    // "ll"
substring('hello world', 4, 2);    // "ll"
substring('hello world', 0, -1);   // ""
substring('hello world', 2);      // "llo world"
substring('hello world', 'a');    // "hello world"
substring('hello world', 8, 20);   // "rld"

// 10. Rot13
// write a function, rot13, that takes a String and returns that string transformed
//   by the ro13 cipher
// requirements:
// > if character is a letter in the modern English alphabet, change it to the
//  character 13 positions later in the alphabet
//     > ex: a becomes n
// > if reach end of the alphabet, return to the beginning (so o, becomes b)
// > letter transformations should preserve case (A -> N, a -> n)
// > don't modify characters that are not letters

// approach:
// > uppercase letters in ascii table correspond with the numeric codes:
//      [65, 90] ("A" -> "Z")
// > lowercase letters in ascii table correspond with the numeric codes:
//      [97, 122] ("a" -> "z")
// > initialize a translated string variable with an empty string that converted
//    characters will be pushed to (or non-converted non-alphabetical characters will
//    be pushed to)
// > iterate through the characters of the given string argument
//     > if the character isn't an alphabetical letter that matches against
//        the regex /[A-Za-z]/ then push the character as is to the translated string
//        variable
//     > if the character does match an alphabetical letter, then establish whether
//        it's uppercased or not
//        > if uppercased, find an array of asciiNumCodes that correspond with "A" -> "Z"
//        > if lowercased, find an array of asciiNumCodes that correspond with "a" -> "z"
//          <=> this array represents the range of acceptable asciiNumCodes that the current
//             character's asciiNumCode shifted 13 places should fall within (***)
//     > initialize a proposed asciiNumCode that corresponds with the asciiNumCode of 
//        the current character being iterated over plus 13
//     > check if the proposed ascii number falls within the range of numbers in the array
//       identified under (***) above
//     > if the proposed ascii number is out of bounds, then find the difference between the
//        proposed ascii number code and the max number in the relevent asciiNumCodes array
//          > subtract 1 from this difference to find the addend amount that should be
//            added onto the minimum number in the array of relevant asciiNumCodes
//     > push to the translated string variable the string character value associated with the
//         prepped proposed asciiNumCode
// > after the loop finishes return the translated string variable's value
function createArrayOfNums(size, startingNumber) {
  return Array(size).fill(0).map((_, num) => num + startingNumber);
}

function shiftLetter(upperOrLower, letter) {
  let proposedAsciiNum = letter.charCodeAt(0) + 13;
  let firstLetter = upperOrLower === 'uppercase' ? 'A' : 'a';
  const ABC_SIZE = 26;

  const RANGE = createArrayOfNums(ABC_SIZE, firstLetter.charCodeAt(0));

  if (RANGE.includes(proposedAsciiNum)) {
    return String.fromCharCode(proposedAsciiNum);
  } else {
    let addend = proposedAsciiNum - Math.max(...RANGE) - 1;
    proposedAsciiNum = Math.min(...RANGE) + addend;
    return String.fromCharCode(proposedAsciiNum);
  }
  
}

function shiftLetterOrStay(letter) {
  if (letter.match(/[a-z]/)) {
    return shiftLetter('lowercase', letter);
  } else if (letter.match(/[A-Z]/)) {
    return shiftLetter('uppercase', letter);
  } else {
    return letter;
  }

}

function rot13(string) {
  let translatedString = '';

  for (let index = 0; index < string.length; index += 1) {
    translatedString += shiftLetterOrStay(string[index]);
  }

  return translatedString;
}

console.log(rot13('Teachers open the door, but you must enter by yourself.'));
// Grnpuref bcra gur qbbe, ohg lbh zhfg ragre ol lbhefrys.

console.log(rot13(rot13('Teachers open the door, but you must enter by yourself.')));
//Teachers open the door, but you must enter by yourself.
