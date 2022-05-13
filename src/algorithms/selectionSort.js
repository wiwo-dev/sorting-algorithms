const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const selectionSort = (blocks, compare) => {
  const dupBlocks = blocks.slice(); // copying blocks array
  const order = [];

  let i;
  let j;

  for (i = 0; i < dupBlocks.length; i++) {
    for (j = i + 1; j < dupBlocks.length; j++) {
      order.push([dupBlocks[i], dupBlocks[j], null, null]); // Compare
      if (!compare(dupBlocks[i], dupBlocks[j])) {
        swap(dupBlocks, i, j);
        order.push([dupBlocks[i], dupBlocks[j], dupBlocks.slice(), null]); // Swap
      }
    }
    order.push([null, null, null, dupBlocks[i]]); // i-th element is in correct position ( Sorted )
  }

  return order;
};
