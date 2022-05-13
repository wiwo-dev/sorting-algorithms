const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

export const insertionSort = (blocks, compare) => {
  const dupBlocks = blocks.slice(); // copying blocks array
  const order = [];

  let i, j;

  for (i = 0; i < dupBlocks.length; i++) {
    j = i - 1;
    while (j >= 0 && compare(dupBlocks[j], dupBlocks[j + 1])) {
      swap(dupBlocks, j, j + 1);
      order.push([dupBlocks[j], dupBlocks[j + 1], null, null]); // Compare
      order.push([dupBlocks[j], dupBlocks[j + 1], dupBlocks.slice(), null]); // Swap
      j -= 1;
    }
  }

  for (i = 0; i < dupBlocks.length; i++) {
    order.push([null, null, null, dupBlocks[i]]);
  }

  return order;
};
