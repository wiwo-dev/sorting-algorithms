let order = [];

const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

const partition = (dupBlocks, l, r, compare) => {
  const pivot = l;
  let j = l;

  for (let i = l + 1; i <= r; i++) {
    order.push([i, pivot, null, null]);
    if (compare(dupBlocks[i], dupBlocks[pivot])) {
      j += 1;
      swap(dupBlocks, i, j);
      order.push([i, j, dupBlocks.slice(), null]);
    }
  }

  swap(dupBlocks, pivot, j);
  order.push([pivot, j, dupBlocks.slice(), null]);
  order.push([null, null, null, j]);
  return j;
};

const quickSortHelper = (dupBlocks, l, r, compare) => {
  if (compare(l, r)) {
    if (compare(l, r) === "EQUAL") order.push([null, null, null, l]);
    return;
  }

  const pivot = l + Math.floor(Math.random() * (r - l));

  swap(dupBlocks, l, pivot);
  order.push([l, pivot, dupBlocks.slice(), null]);

  const m = partition(dupBlocks, l, r, compare);

  quickSortHelper(dupBlocks, l, m - 1);
  quickSortHelper(dupBlocks, m + 1, r);

  return;
};

export const quickSort = (blocks, compare) => {
  const dupBlocks = blocks.slice(); // Copying blocks array
  order = [];

  quickSortHelper(dupBlocks, 0, dupBlocks.length - 1, compare);

  return order;
};
