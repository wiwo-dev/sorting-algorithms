/**
 * swapping two elements from the array basing on the
 * @param {*} array
 * @param {*} indexToCheck1
 * @param {*} indexToCheck2
 * @param {*} compare - compare function
 * @returns
 */
export const swapByIndex = (array, indexToCheck1, indexToCheck2) => {
  let copy = [...array];
  let temp = copy[indexToCheck1];
  copy[indexToCheck1] = copy[indexToCheck2];
  copy[indexToCheck2] = temp;
  //   console.log(
  //     `ZMIANA SORTOWANIE copy[indexToCheck1] ${indexToCheck1} ${copy[indexToCheck1]?.height} .....  copy[indexToCheck2] ${indexToCheck2} ${copy[indexToCheck2]?.height}`
  //   );
  return copy;
};

/**
 * boubble sort and animation
 * @param {*} array
 * @param {*} speed
 * @param {*} compare
 * @param {*} onChange
 * @param {*} addTimeoutId
 */
export const bubbleSortStepByStep = async (array, speed, compare, onChange, addTimeoutId) => {
  let sorted = [...array];
  let length = array.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      //console.log(`i: ${i} | j: ${j}`);
      //debugger;
      if (compare(sorted[j], sorted[j + 1])) {
        sorted[j].active = "red";
        sorted[j + 1].active = "red";
        sorted = swapByIndex(sorted, j, j + 1);
      } else {
        sorted[j].active = "green";
        sorted[j + 1].active = "green";
      }
      onChange([...sorted]);
      if (speed) {
        await new Promise((resolve, reject) => {
          let timeoutId = setTimeout(() => {
            resolve();
          }, speed);
          addTimeoutId(timeoutId);
        });
      }

      sorted[j].active = false;
      sorted[j + 1].active = false;
      onChange([...sorted]);
    }
  }
};

// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
const merge = async (arr, l, m, r, speed, compare, onChange) => {
  onChange([...arr]);

  var n1 = m - l + 1;
  var n2 = r - m;

  // Create temp arrays
  var L = new Array(n1);
  var R = new Array(n2);

  // Copy data to temp arrays L[] and R[]
  for (var i = 0; i < n1; i++) L[i] = arr[l + i];
  for (var j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

  // Merge the temp arrays back into arr[l..r]

  // Initial index of first subarray
  var i = 0;

  // Initial index of second subarray
  var j = 0;

  // Initial index of merged subarray
  var k = l;

  while (i < n1 && j < n2) {
    //onChange([...arr]);
    if (!compare(L[i], R[j])) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;

    //onChange([...arr]);

    // if (speed) {
    //   await new Promise((resolve, reject) => {
    //     let timeoutId = setTimeout(() => {
    //       resolve(1);
    //     }, speed);
    //     //addTimeoutId(timeoutId);
    //   });
    // }
    // onChange([...arr]);
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;

    // onChange([...arr]);
    // if (speed) {
    //   await new Promise((resolve, reject) => {
    //     let timeoutId = setTimeout(() => {
    //       resolve(1);
    //     }, speed);
    //     //addTimeoutId(timeoutId);
    //   });
    // }
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;

    // onChange([...arr]);
    // if (speed) {
    //   await new Promise((resolve, reject) => {
    //     let timeoutId = setTimeout(() => {
    //       resolve(1);
    //     }, speed);
    //     //addTimeoutId(timeoutId);
    //   });
    // }
  }
};

export const mergeSort = async (arr, l, r, speed, compare, onChange) => {
  if (l >= r) {
    return; //returns recursively
  }

  var m = l + parseInt((r - l) / 2);
  mergeSort(arr, l, m, speed, compare, onChange);
  mergeSort(arr, m + 1, r, speed, compare, onChange);

  merge(arr, l, m, r, speed, compare, onChange);
  onChange([...arr]);
};

export const mergeSortStepByStep = (arr, speed, compare, onChange) => {
  mergeSort(arr, 0, arr.length - 1, speed, compare, onChange);
  onChange([...arr]);
};
