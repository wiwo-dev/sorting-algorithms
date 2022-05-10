import { useEffect, useState } from "react";

export const useStripesArray = ({ amount }) => {
  const [stripes, setStripes] = useState([]);
  const [stripesOrdered, setStripesOrdered] = useState([]);
  const [comparing, setComparing] = useState([null, null]);
  const [swapping, setSwapping] = useState([null, null]);
  const [sorted, setSorted] = useState([]);
  const [stripesCount, setStripesCount] = useState(amount ? amount : 20);

  //for each change of amount of stripes
  useEffect(() => {
    const arr = [];
    for (let i = 0; i < stripesCount; i++) {
      const randHeight = Math.round(Math.random() * (window.innerHeight - 200));
      arr.push({
        height: randHeight,
        num: i,
        active: false,
        position: i,
        //color: getRandomColor(),
        color: "grey",
      });
    }
    setStripes(arr);
    clearColors();
  }, [stripesCount]);

  //to set ordered stripes to make animation work
  useEffect(() => {
    let copy = [];
    for (let i = 0; i < stripes.length; i++) {
      copy[stripes[i].num] = stripes[i];
      copy[stripes[i].num].position = i;
    }
    setStripesOrdered(copy);
  }, [stripes]);

  const clearColors = () => {
    setComparing([null, null]);
    setSorted([]);
  };

  const compare = (a, b) => {
    if (a.height > b.height) return true;
    return false;
  };

  const getValue = (array, ind) => array[ind].num;

  const getColor = (str) => {
    if (sorted.includes(str.num)) return "green";
    if (comparing.includes(str.num)) return "red";
    //if (swapping.includes(str.num)) return "yellow";
    return str.color;
  };

  return {
    stripes,
    setStripes,
    stripesOrdered,
    comparing,
    setComparing,
    swapping,
    setSwapping,
    sorted,
    setSorted,
    clearColors,
    stripesCount,
    setStripesCount,
    compare,
    getValue,
    getColor,
  };
};
