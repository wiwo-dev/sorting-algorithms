const swapByIndex = (array, indexToCheck1, indexToCheck2) => {
  let copy = [...array];
  let temp = copy[indexToCheck1];
  copy[indexToCheck1] = copy[indexToCheck2];
  copy[indexToCheck2] = temp;
  return copy;
};

//https://www.geeksforgeeks.org/bubble-sort/
/**
 *
 * @param {*} array
 * @param {*} compare
 * @param {*} getValue
 * @returns ORDER[i]: currently comparing value, currently comparing value, arr, final value
 */
export const bubbleSort = (array, compare, getValue) => {
  let sorted = [...array];
  let length = array.length;

  let order = [];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      //console.log(`i: ${i} | j: ${j}`);

      order.push([getValue(sorted, j), getValue(sorted, j + 1), null, null]); //comparing
      if (compare(sorted[j], sorted[j + 1])) {
        sorted = swapByIndex(sorted, j, j + 1);
        order.push([getValue(sorted, j), getValue(sorted, j + 1), [...sorted], null]);
      }
    }
    order.push([null, null, null, getValue(sorted, length - i - 1)]);
  }
  console.log("KONIEC SORTOWANIA");

  return order;
};
