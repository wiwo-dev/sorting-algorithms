import { useEffect, useState } from "react";
import useWindowHeight from "./useWindowHeight";

export const useStripesArray = ({ amount }) => {
  const [stripes, setStripes] = useState([]);
  const [stripesOrdered, setStripesOrdered] = useState([]);
  const [comparing, setComparing] = useState([]);
  const [swapping, setSwapping] = useState([]);
  const [sorted, setSorted] = useState([]);

  const { height: windowHeight } = useWindowHeight();

  const [stripesCount, setStripesCount] = useState(amount ? amount : 20);

  const resetAllStripes = () => {
    const arr = [];
    for (let i = 0; i < stripesCount; i++) {
      const randHeight = Math.round(Math.random() * (windowHeight - 200));
      arr.push({
        height: randHeight, //value - heihght of the stripe
        initialPosition: i, //to distinguish between stripes - important for animation
        position: i, //
      });
    }
    setStripes(arr);
    clearColors();
  };

  //for each change of amount of stripes
  useEffect(() => {
    resetAllStripes();
  }, [stripesCount]);

  //to set ordered stripes to make animation work
  useEffect(() => {
    let copy = [];
    for (let i = 0; i < stripes.length; i++) {
      copy[stripes[i].initialPosition] = stripes[i];
      copy[stripes[i].initialPosition].position = i;
    }
    setStripesOrdered(copy);
  }, [stripes]);

  const clearColors = () => {
    setComparing([]);
    setSorted([]);
    setSwapping([]);
  };

  const compare = (a, b) => {
    if (a.height === b.height) return "EQUAL";
    if (a.height >= b.height) return true;
    return false;
  };

  const getInitialPosition = (array, ind) => array[ind].initialPosition;

  const getColor = (str) => {
    if (sorted.includes(str)) return "green.100";
    if (swapping.includes(str)) return "yellow.100";
    if (comparing.includes(str)) return "violet.100";
    return "gray.100";
  };

  //swapping elements and returning new array (copy)
  //not changing the source array
  const swapByElements = (arr, a, b) => {
    const copy = [...arr];
    const temp = copy[a.position];
    copy[a.position] = copy[b.position];
    copy[b.position] = temp;
    return copy;
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
    getInitialPosition,
    getColor,
    swapByElements,
  };
};
