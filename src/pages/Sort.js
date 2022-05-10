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
  const [speed, setSpeed] = useState(30);
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
    getValue,
    getColor,
  } = useStripesArray({ amount: 10 });

  const makeStep = (step) => {
    const [a, b, arr, ind] = step;
    //comparing - red
    if (a !== null || b !== null) setComparing([a, b]);
    if (arr) {
      //update order
      setStripes([...arr]);
      if (a !== null || b !== null) setSwapping([a, b]);
    }
    ///already sorted - green
    if (ind !== null) {
      setSorted((prev) => [...prev, ind]);
    }
  };

  const orders = useRef([]);
  const ordersDone = useRef([]);

  const makeNextStep = () => {
    const nextOrder = orders.current.shift();
    ordersDone.current.push(nextOrder);
    makeStep(nextOrder);
  };

  const makePreviousStep = () => {
    const previousOrder = ordersDone.current.pop();
    orders.current.push(previousOrder);
    makeStep(previousOrder);
  };

  useInterval(() => {
    if (orders.current.length <= 0) {
      setIsSortingOn(false);
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
        orders.current = mergeSort(stripes, compare, getValue);
        break;
      case "bubbleSort":
        setIsRunning(true);
        setIsSortingOn(true);
        orders.current = bubbleSort(stripes, compare, getValue);
        break;
      default:
        break;
    }
  };

  const { width: windowWidth } = useWindowWidth();

  const value = {
    stripesOrdered,
    isRunning,
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
