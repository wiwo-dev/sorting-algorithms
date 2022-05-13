let order = [];

const merge = (dupBlocks, l, mid, r, compare) => {
  let i = l;
  let j = mid + 1;

  const arr = [];

  while (i <= mid && j <= r) {
    order.push([dupBlocks[i], dupBlocks[j], null, null]); // Compare i th and j th element
    //??????????? <=  /// >===
    if (!compare(dupBlocks[i], dupBlocks[j])) {
      arr.push(dupBlocks[i++]);
    } else {
      arr.push(dupBlocks[j++]);
    }
  }

  while (i <= mid) {
    order.push([dupBlocks[i], null, null, null]);
    arr.push(dupBlocks[i++]);
  }

  while (j <= r) {
    order.push([null, dupBlocks[j], null, null]);
    arr.push(dupBlocks[j++]);
  }

  for (i = l; i <= r; i++) {
    dupBlocks[i] = arr[i - l];
    order.push([dupBlocks[i], null, dupBlocks.slice(), null]);
  }
};

const mergeSortHelper = (dupBlocks, l, r, compare) => {
  if (l >= r) return;

  const mid = Math.floor((l + r) / 2);

  mergeSortHelper(dupBlocks, l, mid, compare);
  mergeSortHelper(dupBlocks, mid + 1, r, compare);

  merge(dupBlocks, l, mid, r, compare);
};

export const mergeSort = (blocks, compare) => {
  order = [];
  const dupBlocks = blocks.slice(); // copying blocks array

  mergeSortHelper(dupBlocks, 0, dupBlocks.length - 1, compare);

  for (let i = 0; i < dupBlocks.length; i++) {
    order.push([null, null, null, dupBlocks[i]]); // i th element will be in correct position
  }

  return order;
};
