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