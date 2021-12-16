import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getRandomColor } from "./helpers";

export const Stripe = ({ height, width, bgColor }) => {
  return <Box height={`${height}px`} minW={`${width}px`} shadow="md" bgColor={bgColor} />;
};

export const useStripesArray = () => {
  const [stripes, setStripes] = useState([]);
  const [stripesString, setStripesString] = useState("");
  const [comparing, setComparing] = useState([null, null]);
  const [swapping, setSwapping] = useState([null, null]);
  const [sorted, setSorted] = useState([]);
  const [stripesCount, setStripesCount] = useState(20);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < stripesCount; i++) {
      const randHeight = Math.round(Math.random() * (window.innerHeight - 200));
      arr.push({
        height: randHeight,
        num: i,
        active: false,
        //color: getRandomColor(),
        color: "grey",
      });
    }
    setStripes(arr);
  }, [stripesCount]);

  useEffect(() => {
    setStripesString(stripesToString());
    //console.log(stripesString);
  }, [stripes]);

  const stripesToString = () => {
    let str = "";
    stripes.forEach((element) => {
      let compStr = "";
      comparing.forEach((comp) => (compStr = compStr + comp));
      str = str + "|" + element.height + "-" + element.num + "-" + element.active + "|" + compStr;
    });
    return str;
  };

  const clearColors = () => {
    setComparing([null, null]);
    setSorted([]);
  };

  return {
    stripes,
    setStripes,
    stripesString,
    stripesToString,
    comparing,
    setComparing,
    swapping,
    setSwapping,
    sorted,
    setSorted,
    clearColors,
    stripesCount,
    setStripesCount,
  };
};
