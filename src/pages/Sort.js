import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";
import { quickSort } from "algorithms/quickSort";
import { selectionSort } from "algorithms/selectionSort";
import { insertionSort } from "algorithms/insertionSort";
import { shuffleStepByStep } from "algorithms/shuffling";
import { useStripesArray } from "helpers/useStripesArray";
import { useEffect, useRef, useState } from "react";
import { useInterval } from "helpers/useInterval";
import { motion, AnimatePresence } from "framer-motion";

import SettingsPanel from "components/SettingsPanel";
import { SettingsContext } from "helpers/SettingsContext";
import useWindowWidth from "helpers/useWindowWidth";
import StripesPanel from "components/StripesPanel";
import InfoModal from "components/InfoModal";

export default function Sort() {
  const { width: windowWidth } = useWindowWidth();

  const stripeWidth = 20;

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
  } = useStripesArray({ amount: Math.floor(windowWidth / (stripeWidth + 10) / 2) });

  const [speed, setSpeed] = useState(400);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("");

  //SORTING STATUS
  // NO_ORDERS
  // ORDERS_WAITING = FIRST DONE WHEN GOING BACKWARDS
  // FIRST_ORDER_WAITING
  // ORDERS_RUNNING
  // ORDERS_FINISHED - LAST DONE
  //running interval
  //sorting was done and orders are available
  const [sortingStatus, setSortingStatus] = useState("NO_ORDERS");

  const orders = useRef([]);
  const ordersDone = useRef([]);

  const handleAlgorithmChange = (algorithm) => {
    setSelectedAlgorithm(algorithm);
    orders.current = [];
    ordersDone.current = [];
    clearColors();
    setSortingStatus("NO_ORDERS");
  };

  const handleSortPauseResumeButtonClick = () => {
    sortingStatus === "ORDERS_WAITING" && setSortingStatus("ORDERS_RUNNING");
    sortingStatus === "ORDERS_RUNNING" && setSortingStatus("ORDERS_WAITING");
    sortingStatus === "NO_ORDERS" &&
      (() => {
        handleSort("RUN");
        setSortingStatus("ORDERS_RUNNING");
      })();
  };

  const handleShuffleButtonClick = async () => {
    clearColors();
    setSortingStatus("NO_ORDERS");
    shuffleStepByStep(stripes, 0, setStripes);
  };

  const makeStep = (step) => {
    setSwapping([]);
    setComparing([]);
    const [a, b, arr, positionedStripe] = step;
    //comparing - red
    if (a !== null || b !== null) {
      setComparing([a, b]);
    }
    if (arr) {
      //update order
      setStripes([...arr]);
      if (a !== null || b !== null) {
        setSwapping([a, b]);
      }
    }
    ///already sorted - green
    if (positionedStripe !== null) {
      setSorted((prev) => [...prev, positionedStripe]);
    }
  };

  const makeNextStep = () => {
    if (!orders.current.length) {
      setSortingStatus("ORDERS_FINISHED");
      return;
    }
    const nextOrder = orders.current.shift();
    ordersDone.current.push(nextOrder);
    makeStep(nextOrder);
    if (!orders.current.length) setSortingStatus("ORDERS_FINISHED");
  };

  const makePreviousStep = () => {
    if (!ordersDone.current.length) {
      clearColors();
      setSortingStatus("FIRST_ORDER_WAITING");
      return;
    }

    const previousOrder = ordersDone.current.pop();
    //to remove color of previously sorted
    const [a, b, arr, positionedStripe] = previousOrder;
    orders.current.unshift([a, b, arr, positionedStripe]);
    let newArr = arr;
    if (a !== null || b !== null) setComparing([]);
    if (arr) {
      if (a !== null && b !== null) {
        setSwapping([]);
        //stepping back so swapping back is needed
        newArr = swapByElements([...arr], a, b);
      }
    }
    makeStep([a, b, newArr, positionedStripe]);
    setSortingStatus("ORDERS_WAITING");
    if (positionedStripe !== null) setSorted((prev) => prev.filter((i) => i !== positionedStripe));
  };

  const handleNextButtonClick = () => {
    if (sortingStatus === "NO_ORDERS") {
      handleSort();
      setSortingStatus("ORDERS_WAITING");
    }
    makeNextStep();
  };

  const handlePrevButtonClick = () => {
    makePreviousStep();
  };

  useInterval(() => {
    if (orders.current.length <= 0) {
      sortingStatus !== "NO_ORDERS" && setSortingStatus("ORDERS_FINISHED");
      return;
    }
    if (sortingStatus !== "ORDERS_RUNNING") return;
    makeNextStep();
    setSortingStatus("ORDERS_RUNNING");
  }, speed);

  const handleSort = async (mode = "RUN") => {
    switch (selectedAlgorithm) {
      case "mergeSort":
        orders.current = mergeSort(stripes, compare);
        if (mode === "RUN") setSortingStatus("ORDERS_RUNNING");
        break;
      case "bubbleSort":
        orders.current = bubbleSort(stripes, compare);
        if (mode === "RUN") setSortingStatus("ORDERS_RUNNING");
        break;
      case "quickSort":
        orders.current = quickSort(stripes, compare);
        if (mode === "RUN") setSortingStatus("ORDERS_RUNNING");
        break;
      case "selectionSort":
        orders.current = selectionSort(stripes, compare);
        if (mode === "RUN") setSortingStatus("ORDERS_RUNNING");
        break;
      case "insertionSort":
        orders.current = insertionSort(stripes, compare);
        if (mode === "RUN") setSortingStatus("ORDERS_RUNNING");
        break;
      default:
        break;
    }
    if (orders.length) setSortingStatus("ORDERS_WAITING");
  };

  const value = {
    stripeWidth,
    stripesOrdered,
    handleSortPauseResumeButtonClick,
    makeNextStep,
    handleNextButtonClick,
    handlePrevButtonClick,
    makePreviousStep,
    handleShuffleButtonClick,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleAlgorithmChange,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    getColor,
    clearColors,
    sortingStatus,
    setSortingStatus,
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
    return () => {};
  }, []);

  return (
    <SettingsContext.Provider value={value}>
      <Box>
        <SettingsPanel />
        <StripesPanel />
        <InfoModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        <Button onClick={onOpen}>Open Modal</Button>
      </Box>
    </SettingsContext.Provider>
  );
}
