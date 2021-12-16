// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
const merge = async (arr, l, m, r, compare, order, getValue) => {
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
    //compage
    order.push([getValue(L, i), getValue(R, j), null, null]);

    if (!compare(L[i], R[j])) {
      arr[k] = L[i];
      i++;
    } else {
      arr[k] = R[j];
      j++;
    }
    k++;
  }

  // Copy the remaining elements of
  // L[], if there are any
  while (i < n1) {
    arr[k] = L[i];
    i++;
    k++;
  }

  // Copy the remaining elements of
  // R[], if there are any
  while (j < n2) {
    arr[k] = R[j];
    j++;
    k++;
  }
  //console.log("dlugosc L");
  //console.log(L.length);
  order.push([null, null, [...arr], null]);
};

export const mergeSortHelper = async (arr, l, r, compare, order, getValue) => {
  if (l >= r) {
    //if(l==arr.length)
    //order.push([null, null, null, getValue(arr, r)]);
    //console.log(l);
    return; //returns recursively
  }

  var m = l + parseInt((r - l) / 2);
  mergeSortHelper(arr, l, m, compare, order, getValue);
  mergeSortHelper(arr, m + 1, r, compare, order, getValue);

  merge(arr, l, m, r, compare, order, getValue);
};

export const mergeSort = (arr, compare, getValue) => {
  let order = [];
  let copy = [...arr];
  mergeSortHelper(copy, 0, copy.length - 1, compare, order, getValue);

  for (let i = 0; i < copy.length; i++) {
    order.push([null, null, null, getValue(copy, i)]); // i th element will be in correct position: ;
  }

  return order;
};
