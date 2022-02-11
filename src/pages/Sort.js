import { Box } from "@chakra-ui/react";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";
import { shuffleStepByStep } from "helpers/shuffling";

import { useStripesArray } from "helpers/useStripesArray";

import { useRef, useState } from "react";

import { useInterval } from "helpers/useInterval";

import { SettingsContext } from "helpers/SettingsContext";
import SettingsPanel from "components/SettingsPanel";
import StripesGroup from "components/StripesGroup";

export default function Sort({}) {
  const [speed, setSpeed] = useState(30);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");
  const [isRunning, setIsRunning] = useState(false);
  const handleToggleIsRunning = () => {
    setIsRunning((prev) => !prev);
  };

  const handleQuickShuffleClick = async () => {
    clearColors();
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
  } = useStripesArray({ stripesCount: 30 });

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

  useInterval(() => {
    if (orders.current.length <= 0) return;
    if (!isRunning) return;
    makeStep(orders.current.shift());
  }, speed);

  const orders = useRef([]);

  const handleSort = async () => {
    setIsRunning(true);
    switch (selectedAlgorithm) {
      case "mergeSort":
        orders.current = mergeSort(stripes, compare, getValue);
        break;
      case "bubbleSort":
        orders.current = bubbleSort(stripes, compare, getValue);
        break;
      default:
        break;
    }
  };

  const value = {
    stripesOrdered,
    isRunning,
    handleToggleIsRunning,
    handleQuickShuffleClick,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    getColor,
  };

  return (
    <SettingsContext.Provider value={value}>
      <Box>
        <SettingsPanel />
        <StripesGroup />
      </Box>
    </SettingsContext.Provider>
  );
}
