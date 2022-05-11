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
 * @returns ORDER[i]: currently comparing value, currently comparing value, arr, final value
 */
export const bubbleSort = (array, compare) => {
  let sorted = [...array];
  let length = array.length;

  let order = [];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      //console.log(`i: ${i} | j: ${j}`);

      order.push([sorted[j], sorted[j + 1], null, null]); //comparing
      if (compare(sorted[j], sorted[j + 1])) {
        sorted = swapByIndex(sorted, j, j + 1);
        order.push([sorted[j], sorted[j + 1], [...sorted], null]); //comparing - changing order
      }
    }
    order.push([null, null, null, sorted[length - i - 1]]); //final value
  }
  console.log("KONIEC SORTOWANIA");

  // const arrays = [];
  // order.map((el, ind) => {
  //   if (el[2]) {
  //     arrays.push(el[2]);
  //   }
  // });

  // arrays.map((stripe) => {
  //   console.log(stripe[0]);
  // });

  return order;
};
