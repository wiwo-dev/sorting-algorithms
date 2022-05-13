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
    console.log("PUSHING");
    order.push([dupBlocks[i], dupBlocks[pivot], null, null]);
    if (!compare(dupBlocks[i], dupBlocks[pivot])) {
      j += 1;
      swap(dupBlocks, i, j);
      order.push([dupBlocks[i], dupBlocks[j], dupBlocks.slice(), null]);
    }
  }

  swap(dupBlocks, pivot, j);
  order.push([dupBlocks[pivot], dupBlocks[j], dupBlocks.slice(), null]);
  order.push([null, null, null, dupBlocks[j]]);
  return j;
};

const quickSortHelper = (dupBlocks, l, r, compare) => {
  if (l >= r) {
    if (l === r) {
      console.log("PUSHING");
      order.push([null, null, null, dupBlocks[l]]);
    }
    return;
  }

  const pivot = l + Math.floor(Math.random() * (r - l));

  swap(dupBlocks, l, pivot);
  order.push([dupBlocks[l], dupBlocks[pivot], dupBlocks.slice(), null]);

  const m = partition(dupBlocks, l, r, compare);

  quickSortHelper(dupBlocks, l, m - 1, compare);
  quickSortHelper(dupBlocks, m + 1, r, compare);

  return;
};

export const quickSort = (blocks, compare) => {
  const dupBlocks = blocks.slice(); // Copying blocks array
  order = [];

  quickSortHelper(dupBlocks, 0, dupBlocks.length - 1, compare);

  console.log(order);
  return order;
};
