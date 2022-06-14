// 1. write a function that takes 2 Objects as arguments and copies all
// properties from the 1st object to the second. The function should
// return the # of properties copied
function copyProperties(object1, object2) {
  for (let property in object1) {
    object2[property] = object1[property];
  }

  return Object.keys(object1).length;
}

// 2. Write a function that takes 1 string argument and returns an object
// that contains the counts of each word that appears in the string
// assumption: words are delimited by single spaces
function objectHasProperty(object, propertyName) {
  return Object.keys(object).indexOf(propertyName) !== -1;
}

function incrementProperty(object, propertyName) {
  if (objectHasProperty(object, propertyName)) {
    object[propertyName] += 1;
  } else {
    object[propertyName] = 1;
  }

  return object[propertyName];
}

function wordCount(string) {
  let words = string.split(' ');
  let counts = {};

  for (let index = 0; index < words.length; index += 1) {
    let word = words[index];
    incrementProperty(counts, word);
  }

  return counts;
}

wordCount('box car cat bag box'); // { bag: 1, box: 2, car: 1, cat: 1 }

// 3. Array comparison
// write a function that returns a boolean specifying if the arrays contain
// the same values
// reqs:
// > based on test cases, only comparing elements at non-negative integer indices
function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let copyArr2 = arr2.slice();
  for (let idx = 0; idx < arr1.length; idx += 1) {
    let indexOfArr1Element = copyArr2.indexOf(arr1[idx]);
    if (indexOfArr1Element >= 0) {
      copyArr2.splice(indexOfArr1Element, 1);
    } else {
      return false;
    }
  }

  return true;
}

areArraysEqual([1, 2, 3], [1, 2, 3]);                  // true
areArraysEqual([1, 2, 3], [3, 2, 1]);                  // true
areArraysEqual(['a', 'b', 'c'], ['b', 'c', 'a']);      // true
areArraysEqual(['1', 2, 3], [1, 2, 3]);                // false
areArraysEqual([1, 1, 2, 3], [3, 1, 2, 1]);            // true
areArraysEqual([1, 2, 3, 4], [1, 1, 2, 3]);            // false
areArraysEqual([1, 1, 2, 2], [4, 2, 3, 1]);            // false
areArraysEqual([1, 1, 2], [1, 2, 2]);                  // false
areArraysEqual([1, 1, 1], [1, 1]);                     // false
