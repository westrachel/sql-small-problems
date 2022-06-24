// 1. Join
// write a function that takes an array and a delimiter as arguments and joins
// the array elements into a string with the delimiter acting as the separator
// between elements
function join(arr, delimiter) {
  let joinedElements = '';

  for (let index = 0; index < arr.length - 1; index += 1) {
    joinedElements += arr[index];
    joinedElements += delimiter;
  }

  joinedElements += arr[arr.length - 1];
  return joinedElements;
}

join(['bri', 'tru', 'wha'], 'ck ');       // 'brick truck wha'
join([1, 2, 3], ' and ');                 // '1 and 2 and 3'

// 2. Array Comparison
// write a function that returns a boolean value specifying whether the arrays
// passed in contain the same values or not
function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  } else {
    for (let index = 0; index < arr1.length; index += 1) {
      if (arr1[index] !== arr2[index]) {
        return false;
      }
    }
    return true;
  }
}

arraysEqual([1], [2]);                               // false
arraysEqual([1, 2], [1, 2, 3]);                      // false
arraysEqual([1, 'hi', true], [1, 'hi', false]);      // false
arraysEqual([1, 'hi', true], [1, 'hello', true]);    // false
arraysEqual([1, 'hi', true], [1, 'hi', true]);       // true

// 3. Odd Elements
// write a function that takes an array and returns a new array that contains
// elements located at odd indices of the passed in array
function oddElementsOf(arr) {
  let oddElements = [];

  for (let index = 1; index < arr.length; index += 2) {
    oddElements.push(arr[index]);
  }

  return oddElements;
}

// 4. Sum Subarrays
// write a function that takes an array of subarrays argument and returns a new
//   array containing the totals of adding all the elements of each subarray
function subarraySums(arr) {
  let sums = [];

  for (let subarrIdx = 0; subarrIdx < arr.length; subarrIdx += 1) {
    let total = 0;
    let largestSubIdx = arr[subarrIdx].length - 1;

    for (let index = 0; index <= largestSubIdx; index += 1) {
      total += arr[subarrIdx][index];
    }

    sums.push(total);
  }

  return sums;
}

subarraySums([[2, 8, 5], [12, 48, 0], [12]]);  // [15, 60, 12]

// 5. De-duplicate
// write a function that takes an array and returns a new array with only unique
// values
function uniqueElements(arr) {
  let uniqueValues = [];

  for (let index = 0; index < arr.length; index += 1) {
    if (!uniqueValues.includes(arr[index])) {
      uniqueValues.push(arr[index]);
    }
  }

  return uniqueValues;
}

uniqueElements([1, 2, 4, 3, 4, 1, 5, 4]); // returns [1, 2, 4, 3, 5]

// 6. Missing From Sequence
// write a function that takes an array and returns a new array of all the
// integers the are missing from the sequence of the smallest to largest integer
// in the given array
function missing(arr) {
  let value = Math.min(...arr);
  let largest = Math.max(...arr);
  let missings = [];

  while (value < largest) {
    value += 1;
    if (!arr.includes(value)) {
      missings.push(value)
    }
  }

  return missings;
}

missing([-3, -2, 1, 5]);                  // [-1, 0, 2, 3, 4]
missing([1, 2, 3, 4]);                    // []
missing([1, 5]);                          // [2, 3, 4]
missing([6]);                             // []

// 7. Rebuilt Concat Method
// requirements:
// > first argument is always an array
// > second argument can be an array or another value
// > return value should be a new array that combines the first argument with
//   the second argument
// > if an object passed into the function is changed that change should be
//     reflected in the return value
// > the function should copy primitive values
function addArrElements(array, elements) {
  for (let idx = 0; idx < elements.length; idx += 1) {
    array.push(elements[idx]);
  }

  return array;
}

function concat(arr, value) {
  let newArr = [];
  newArr = addArrElements(newArr, arr);

  if (Array.isArray(value)) {
    newArr = addArrElements(newArr, value);
  } else {
    newArr.push(value);
  }
  
  return newArr;
}

concat([1, 2, 3], [4, 5, 6]);       // [1, 2, 3, 4, 5, 6]
concat([1, 2], 3);                  // [1, 2, 3]
concat([2, 3], ['two', 'three']);   // [2, 3, "two", "three"]
concat([2, 3], 'four');             // [2, 3, "four"]

const obj = { a: 2, b: 3 };
const newArray = concat([2, 3], obj);
newArray[2];           // { a: 2, b: 3 }
obj.a = 'two';
newArray[2];          // { a: "two", b: 3 }

// update method to allow for accepting more than 2 arguments
function concat(...values) {
  let newArr = [];

  for (let index = 0; index < values.length; index += 1) {
    if (Array.isArray(values[index])) {
      newArr = addArrElements(newArr, values[index]);
    } else {
      newArr.push(values[index]);
    }
  }
  
  return newArr;
}

concat([1, 2, 3], [4, 5, 6], [7, 8, 9]);    // [1, 2, 3, 4, 5, 6, 7, 8, 9]
concat([1, 2], 'a', ['one', 'two']);        // [1, 2, "a", "one", "two"]
concat([1, 2], ['three'], 4);               // [1, 2, "three", 4]

// 8. Running Totals
// write a function that accepts an array argument and returns a new array
// whose values represent the running total of the sum of elements in the
// passed in array
function runningTotal(array) {
  let totals = [];
  let total = 0;

  for (let idx = 0; idx < array.length; idx += 1) {
    total += array[idx];
    totals.push(total);
  }

  return totals;
}

runningTotal([2, 5, 13]);             // [2, 7, 20]
runningTotal([14, 11, 7, 15, 20]);    // [14, 25, 32, 47, 67]
runningTotal([3]);                    // [3]
runningTotal([]);                     // []

// 9. Union
// write a function that accepts 2 array arguments and returns
// a new array containing only the union of elements from both
// there shouldn't be any repeat values in the returned array
function addToArray(newArr, values) {
  for(let idx = 0; idx < values.length; idx += 1) {
    if (!newArr.includes(values[idx])) {
      newArr.push(values[idx]);
    }
  }

  return newArr;
}

function union(arr1, arr2) {
  let combo = addToArray([], arr1);
  combo = addToArray(combo, arr2);

  return combo;
}

union([1, 3, 5], [3, 6, 9]);    // [1, 3, 5, 6, 9]

// 10. Halvsies
// write a function that splits a given array argument into 2 separate
// arrays
function halvsies(array) {
  let midpoint = Math.ceil(array.length / 2);
  let firstArr = [];
  let secondArr = [];

  for (let idx = 0; idx < midpoint; idx += 1) {
    firstArr.push(array[idx]);
  }

  for (let idx = midpoint; idx < array.length; idx += 1) {
    secondArr.push(array[idx]);
  }

  return [firstArr, secondArr];
}

halvsies([1, 2, 3, 4]);       // [[1, 2], [3, 4]]
halvsies([1, 5, 2, 4, 3]);    // [[1, 5, 2], [4, 3]]
halvsies([5]);                // [[5], []]
halvsies([]);                 // [[], []]


// 11. Find the one duplicate in a given array
function findDup(array) {
  let counts = {};

  for (let idx = 0; idx < array.length; idx += 1) {
    let value = String(array[idx]);

    if (Object.keys(counts).includes(value)) {
      return array[idx];
    } else {
      counts[value] = 1;
    }
  }

}

findDup([1, 5, 3, 1]);  // 1
findDup([18, 9, 36, 96, 31, 19,
         54, 75, 42, 15, 38, 25,
         97, 92, 46, 69, 91, 59,
         53, 27, 14, 61, 90, 81,
         8, 63, 95, 99, 30, 65,
         78, 76, 48, 16, 93, 77,
         52, 49, 37, 29, 89, 10,
         84, 1, 47, 68, 12, 33,
         86, 60, 41, 44, 83, 35,
         94, 73, 98, 3, 64, 82,
         55, 79, 80, 21, 39, 72,
         13, 50,  6, 70, 85, 87,
         51, 17, 66, 20, 28, 26,
         2, 22, 40, 23, 71, 62,
         73, 32, 43, 24, 4, 56,
         7, 34, 57, 74, 45, 11,
         88, 67, 5, 58]);  // 73

// 12. Alternate lists
// can assume nonempty arguments + same lengthed arguments
function interleave(arr1, arr2) {
  let newArr = [];
  
  for (let idx = 0; idx < arr1.length; idx += 1) {
    newArr.push(arr1[idx]);
    newArr.push(arr2[idx]);
  }

  return newArr;
}
interleave([1, 2, 3], ['a', 'b', 'c']); // [1, "a", 2, "b", 3, "c"]

// 13. Calc the straight multiplicative avg rounded to 3 
//  decimals & returned as a string
function showMultiplicativeAverage(array) {
  let avg = 1;

  for (let idx = 0; idx < array.length; idx += 1) {
    avg *= array[idx];
  }

  avg /= array.length;

  return avg.toFixed(3);
}

showMultiplicativeAverage([3, 5]);                  // "7.500"
showMultiplicativeAverage([2, 5, 7, 11, 13, 17]);   // "28361.667"

// 14. Multiply lists
function multiplyLists(arr1, arr2) {
  let products = [];

  for (let idx = 0; idx < arr1.length; idx += 1) {
    let product = arr1[idx] * arr2[idx];
    products.push(product);
  }

  return products;
}
multiplyLists([3, 5, 7], [9, 10, 11]);  // [27, 50, 77]


// 15. Digit list
function digitList(num) {
  return String(num).split('').map(x => Number(x));
}

digitList(12345);       // [1, 2, 3, 4, 5]
digitList(7);           // [7]

// 16. Log the Occurrences of Array Elements
function countOccurrences(arr) {
  let counts = {};

  for (let idx = 0; idx < arr.length; idx += 1) {
    if (Object.keys(counts).includes(arr[idx])) {
      counts[arr[idx]] += 1;
    } else {
      counts[arr[idx]] = 1;
    }
  }

  for (let property in counts) {
    console.log(property + " => " + counts[property]);
  }
}
const vehicles = ['car', 'car', 'truck', 'car', 'SUV', 'truck',
                'motorcycle', 'motorcycle', 'car', 'truck'];
countOccurrences(vehicles);
// console output
// car => 4
// truck => 3
// SUV => 1
// motorcycle => 2

// 17. Sequence Count
function sequence(count, start) {
  let seq = [];

  for (let multiplier = 1; multiplier <= count; multiplier += 1) {
    seq.push(multiplier * start);
  }

  return seq;
}
sequence(5, 1);          // [1, 2, 3, 4, 5]
sequence(4, -7);         // [-7, -14, -21, -28]
sequence(3, 0);          // [0, 0, 0]
sequence(0, 1000000);    // []