import { Box } from "@chakra-ui/react";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";
import { quickSort } from "algorithms/quickSort";
import { shuffleStepByStep } from "algorithms/shuffling";
import { useStripesArray } from "helpers/useStripesArray";
import { useRef, useState } from "react";
import { useInterval } from "helpers/useInterval";
import { motion, AnimatePresence } from "framer-motion";
import SettingsPanel from "components/SettingsPanel";
import SettingsPanelNew from "components/SettingsPanelNew";
import { SettingsContext } from "helpers/SettingsContext";
import useWindowWidth from "helpers/useWindowWidth";
import StripesPanel from "components/StripesPanel";

export default function Sort() {
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

  const [speed, setSpeed] = useState(130);
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

  let [lastMove, setLastMove] = useState("first");

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
    //setSortingStatus("ORDERS_WAITING");
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
      }
    }
    ///already sorted - green
    if (positionedStripe !== null) {
      setSorted((prev) => [...prev, positionedStripe]);
      setComparing([]);
      setSwapping([]);
    }
  };

  const makeNextStep = () => {
    if (!orders.current.length) {
      setLastMove("last");
      setSortingStatus("ORDERS_FINISHED");
      console.log("ORDERS_FINISHED");
      return;
    }
    const nextOrder = orders.current.shift();
    ordersDone.current.push(nextOrder);
    makeStep(nextOrder);
    setLastMove("next");
    if (!orders.current.length) {
      setLastMove("last");
      setSortingStatus("ORDERS_FINISHED");
    }
  };

  const handleNextButtonClick = () => {
    if (sortingStatus === "NO_ORDERS") {
      handleSort();
      setSortingStatus("ORDERS_WAITING");
      console.log("BUTTON PRESSED");
    }
    makeNextStep();
  };

  const handlePrevButtonClick = () => {
    makePreviousStep();
  };

  const makePreviousStep = () => {
    if (!ordersDone.current.length) {
      clearColors();
      setComparing([]);
      setSwapping([]);
      setLastMove("first");
      setSortingStatus("FIRST_ORDER_WAITING");
      console.log("FIRST_ORDER_WAITING");
      return;
    }

    //to avoid the need to double click
    // if (lastMove === "next") {
    //   setLastMove("previous");
    //   //makePreviousStep();
    // }

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

    setLastMove("previous");
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
    //mode: RUN, ONE
    switch (selectedAlgorithm) {
      case "mergeSort":
        orders.current = mergeSort(stripes, compare);

        setSortingStatus("ORDERS_WAITING");
        if (mode === "RUN") {
          setSortingStatus("ORDERS_RUNNING");
        }
        break;
      case "bubbleSort":
        orders.current = bubbleSort(stripes, compare);

        setSortingStatus("ORDERS_WAITING");
        if (mode === "RUN") {
          setSortingStatus("ORDERS_RUNNING");
        }
        break;
      case "quickSort":
        orders.current = quickSort(stripes, compare);
        setSortingStatus("ORDERS_WAITING");
        if (mode === "RUN") {
          setSortingStatus("ORDERS_RUNNING");
        }
        break;
      default:
        break;
    }
  };

  const { width: windowWidth } = useWindowWidth();

  const stripeWidth = 20;

  const value = {
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
    lastMove,
    sortingStatus,
    setSortingStatus,
  };

  return (
    <SettingsContext.Provider value={value}>
      <Box>
        <SettingsPanelNew />
        <StripesPanel />
      </Box>
    </SettingsContext.Provider>
  );
}
