import { Route, Switch, Redirect } from "react-router-dom";
import {
  Box,
  Heading,
  Button,
  Slide,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Flipper, Flipped, spring } from "react-flip-toolkit";

import { getRandomColor } from "helpers/helpers";
import { shuffleOneStepSpecific, shuffleStepByStep } from "helpers/shuffling";
import { bubbleSortStepByStep, mergeSortStepByStep } from "helpers/sorting";
import { useStripesArray, Stripe } from "helpers/useStripesArray";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";

export default function Sort({}) {
  const [counter, setCounter] = useState(0);

  const timeoutIds = useRef([]);

  const addTimeoutId = (timeoutId) => {
    //console.log(timeoutId);
    timeoutIds.current.push(timeoutId);
  };

  const { stripes, setStripes, stripesString, stripesToString, comparing, setComparing } = useStripesArray();

  const handleOneStepShuffleClick = async () => {
    shuffleStepByStep(stripes, 0, setStripes);
  };

  const handleStepByStepShuffleClick = async () => {
    shuffleStepByStep(stripes, speed, setStripes);
  };

  const handleResolveClick = () => {
    for (const timeout of timeoutIds.current) {
      //console.log(timeout);
      clearTimeout(timeout);
    }
  };

  const compare = (a, b) => {
    if (a.height > b.height) return true;
    return false;
  };

  const handleSortStepByStepClick = () => {
    bubbleSortStepByStep(stripes, speed, compare, setStripes, addTimeoutId);
  };

  const handleMergeSortStepByStepClick = () => {
    mergeSortStepByStep(stripes, speed, compare, setStripes, addTimeoutId);
  };

  //using different approach - first setting 'order' array as all steps of algo
  const handleSort = async () => {
    //let order = bubbleSort(stripes, compare);
    let order = mergeSort(stripes, compare);

    for (const step of order) {
      //console.log(order);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const [a, b, arr, ind] = step;

          //comparing
          if (a !== null || b !== null) setComparing([a, b]);

          if (arr) {
            console.log("petla order i mam arr");
            console.log(arr);
            setStripes([...arr]);
          }
          resolve();
        }, speed);
      });
    }
  };

  const [speed, setSpeed] = useState(20);

  return (
    <Box>
      <Box minH="70px" bgColor="orange.200" display="flex" justifyContent="center" gridGap="20px" alignItems="center">
        <Button onClick={handleSortStepByStepClick}>SORT SBS</Button>
        <Button onClick={handleMergeSortStepByStepClick}>MERGE SORT</Button>
        <Button onClick={handleOneStepShuffleClick}>RANDOM ONE STEP</Button>
        <Button onClick={handleStepByStepShuffleClick}>RANDOM STEP BY STEP</Button>
        <Button onClick={handleSort}>HANDLE SORT</Button>
        <Button onClick={handleResolveClick}>RESOLVE</Button>
        <Slider
          aria-label="slider-ex-2"
          colorScheme="pink"
          min={0}
          max={500}
          defaultValue={3}
          maxW="300px"
          onChange={(val) => setSpeed(val)}>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb />
        </Slider>
        <Text minW="30px">{speed}</Text>
      </Box>
      <Flipper
      //flipKey={stripesToString()}
      // staggerConfig={{ default: { speed: 1 } }}
      //spring="gentle"
      >
        <Box display="flex" flexDirection="row" justifyContent="space-around" minW="100%" minH="100vh">
          {stripes?.map((s, index) => (
            <Flipped flipId={s.num} key={index}>
              <Box key={index}>
                <Stripe
                  height={s.height}
                  width={10}
                  bgColor={
                    s.active !== false
                      ? s.active
                      : s.num === comparing[0]
                      ? "yellow"
                      : s.num === comparing[1]
                      ? "yellow"
                      : s.color
                  }
                />
                {/* {{ ...s.el }} */}
              </Box>
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </Box>
  );
}
