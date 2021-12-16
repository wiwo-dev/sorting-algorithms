//https://bost.ocks.org/mike/shuffle/
export function shuffle(array) {
  let copy = [];
  let n = array.length;
  let i;
  // While there remain elements to shuffle…
  while (n) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);
    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      n--;
    }
  }
  return copy;
}

export const shuffleOneStepSpecific = (array, indexToMove) => {
  let el = array[indexToMove];
  let newArray = array.splice(indexToMove, 1);
  newArray = array;
  let i = Math.floor(Math.random() * newArray.length);
  let copy = [...newArray.slice(0, i), el, ...newArray.slice(i, newArray.length)];
  return copy;
};

export const shuffleStepByStep = async (array, speed, onChange) => {
  let numbersArr = [...array.map((s) => s.num + 1)];
  let n = array.length;
  let copy = [...array];
  while (n) {
    // Pick a remaining element…
    let i = Math.floor(Math.random() * copy.length);
    // If not already shuffled, move it to the new array.
    if (copy[i].num in numbersArr) {
      if (speed) {
        await new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve();
          }, speed);
        });
      }
      delete numbersArr[copy[i].num];
      copy = shuffleOneStepSpecific(copy, i);
      // console.log(copy);
      // console.log(numbersArr);
      n--;
      onChange(copy);
    }
  }
};
