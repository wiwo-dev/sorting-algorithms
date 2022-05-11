import { Box } from "@chakra-ui/react";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";
import { shuffleStepByStep } from "algorithms/shuffling";
import { useStripesArray } from "helpers/useStripesArray";
import { createContext, useRef, useState } from "react";
import { useInterval } from "helpers/useInterval";
import SettingsPanel from "components/SettingsPanel";
import { motion } from "framer-motion";

import { SettingsContext } from "helpers/SettingsContext";
import useWindowWidth from "helpers/useWindowWidth";

export default function Sort() {
  const [speed, setSpeed] = useState(130);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  //for interval
  const [isRunning, setIsRunning] = useState(false);

  //for start or resume/pause
  const [isSortingOn, setIsSortingOn] = useState(false);

  const handleToggleIsRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleQuickShuffleClick = async () => {
    clearColors();
    setIsSortingOn(false);
    shuffleStepByStep(stripes, 0, setStripes);
  };

  const {
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
  } = useStripesArray({ amount: 10 });

  const makeStep = (step) => {
    const [a, b, arr, positionedStripe] = step;
    //comparing - red
    if (a !== null || b !== null) {
      setSwapping([]);
      setComparing([]);
      setComparing([a, b]);
    }
    if (arr) {
      //update order
      setStripes([...arr]);

      if (a !== null || b !== null) {
        setComparing([]);
        setSwapping([a, b]);
        //if going back (previous step) it has to swap back
      }
    }
    ///already sorted - green
    if (positionedStripe !== null) {
      setSorted((prev) => [...prev, positionedStripe]);
      setComparing([]);
      setSwapping([]);
    }
  };

  const orders = useRef([]);
  const ordersDone = useRef([]);

  let lastMove = useRef(null);

  const makeNextStep = () => {
    if (lastMove.current === "previous") {
      lastMove.current = "next";
      makeNextStep();
    }

    const nextOrder = orders.current.shift();
    ordersDone.current.push(nextOrder);
    makeStep(nextOrder);

    lastMove.current = "next";
  };

  const makePreviousStep = () => {
    if (lastMove.current === "next") {
      lastMove.current = "previous";
      makePreviousStep();
    }

    const previousOrder = ordersDone.current.pop();
    //to remove color of previously sorted
    const [a, b, arr, positionedStripe] = previousOrder;
    orders.current.unshift([a, b, arr, positionedStripe]);
    let newArr = arr;
    if (a !== null || b !== null) setComparing([]);
    if (arr) {
      //update order
      //setStripes([...arr]);
      if (a !== null || b !== null) {
        setSwapping([]);
        //stepping back so should swap back
        newArr = swapByElements([...arr], a, b);
      }
    }
    //
    makeStep([a, b, newArr, positionedStripe]);
    if (positionedStripe !== null) setSorted((prev) => prev.filter((i) => i !== positionedStripe));

    lastMove.current = "previous";
  };

  useInterval(() => {
    if (orders.current.length <= 0) {
      setIsSortingOn(false);
      setIsRunning(false);
      return;
    }
    if (!isRunning) return;
    makeNextStep();
  }, speed);

  const handleSort = async () => {
    switch (selectedAlgorithm) {
      case "mergeSort":
        setIsRunning(true);
        setIsSortingOn(true);
        orders.current = mergeSort(stripes, compare, getInitialPosition);
        break;
      case "bubbleSort":
        setIsRunning(true);
        setIsSortingOn(true);
        orders.current = bubbleSort(stripes, compare);
        break;
      default:
        break;
    }
  };

  const { width: windowWidth } = useWindowWidth();

  const value = {
    stripesOrdered,
    isRunning,
    setIsRunning,
    handleToggleIsRunning,
    isSortingOn,
    setIsSortingOn,
    makeNextStep,
    makePreviousStep,
    handleQuickShuffleClick,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    getColor,
    clearColors,
  };

  const stripeWidth = 20;

  return (
    <SettingsContext.Provider value={value}>
      <Box>
        <SettingsPanel />
        <Box position="relative" height={window.innerHeight - 100}>
          {stripesOrdered.map((str, i) => {
            const distance = windowWidth / stripesCount;
            return (
              <motion.div
                key={i}
                animate={{ x: str.position * distance + distance / 2 - stripeWidth / 2 }}
                transition={{ duration: 0.1 }}
                style={{
                  position: "absolute",
                  height: `${str.height}px`,
                  width: `${stripeWidth}px`,
                  background: getColor(str),
                }}></motion.div>
            );
          })}
        </Box>
      </Box>
    </SettingsContext.Provider>
  );
}
