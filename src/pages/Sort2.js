import {
  Box,
  Button,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  RadioGroup,
  Stack,
  VStack,
  Radio,
} from "@chakra-ui/react";
import { bubbleSort } from "algorithms/bubbleSort";
import { mergeSort } from "algorithms/mergeSort";
import { shuffleStepByStep } from "helpers/shuffling";
import { bubbleSortStepByStep, mergeSortStepByStep } from "helpers/sorting";
import { useStripesArray } from "helpers/useStripesArray";
import { Stripe } from "components/Stripe";
import { useRef, useState } from "react";
import { Flipped, Flipper } from "react-flip-toolkit";

export default function Sort2({}) {
  const [speed, setSpeed] = useState(30);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("bubbleSort");

  const {
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
  } = useStripesArray({ stripesCount: 30 });

  const handleQuickShuffleClick = async () => {
    clearColors();
    shuffleStepByStep(stripes, 0, setStripes);
  };

  const handleStepByStepShuffleClick = async () => {
    clearColors();
    shuffleStepByStep(stripes, speed, setStripes);
  };

  const compare = (a, b) => {
    if (a.height > b.height) return true;
    return false;
  };

  const getValue = (array, ind) => array[ind].num;

  //using different approach - first setting 'order' array as all steps of algo
  const handleSort = async () => {
    let order = [];
    switch (selectedAlgorithm) {
      case "mergeSort":
        order = mergeSort(stripes, compare, getValue);
        break;
      case "bubbleSort":
        order = bubbleSort(stripes, compare, getValue);
        break;
      default:
        break;
    }

    for (const step of order) {
      //console.log(order);
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          const [a, b, arr, ind] = step;

          //comparing - yellow
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
          resolve();
        }, speed);
      });
    }
  };

  return (
    <Box>
      <Box minH="70px" bgColor="orange.200" display="flex" justifyContent="center" gridGap="20px" alignItems="center">
        <Button onClick={handleQuickShuffleClick}>SHUFFLE QUICK</Button>
        <Button onClick={handleStepByStepShuffleClick}>SHUFFLE STEP BY STEP</Button>
        <RadioGroup onChange={setSelectedAlgorithm} value={selectedAlgorithm}>
          <VStack direction="row">
            <Radio value="bubbleSort">bubbleSort</Radio>
            <Radio value="mergeSort">mergeSort</Radio>
          </VStack>
        </RadioGroup>
        <Button onClick={handleSort}>SORT {selectedAlgorithm}</Button>

        <VStack minW="200px">
          <Text fontSize="xs" minW="30px">
            Speed: {speed}
          </Text>
          <Slider colorScheme="pink" min={0} max={500} maxW="300px" onChange={(val) => setSpeed(val)}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
        <VStack minW="200px">
          <Text fontSize="xs" minW="30px">
            Count: {stripesCount}
          </Text>
          <Slider colorScheme="blue" min={0} max={100} maxW="300px" onChange={setStripesCount}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
      <Flipper
        flipKey={stripesToString()}
        // staggerConfig={{ default: { speed: 1 } }}
        //spring="gentle"
      >
        <Box display="flex" flexDirection="row" justifyContent="center" gridGap="2px" minW="100%" minH="100vh">
          {stripes?.map((s, index) => (
            <Flipped flipId={s.num} key={s.num}>
              <div>
                <Stripe
                  height={s.height}
                  comparing={comparing}
                  swapping={swapping}
                  sorted={sorted}
                  num={s.num}
                  active={s.active}
                  color={s.color}
                />
              </div>
            </Flipped>
          ))}
        </Box>
      </Flipper>
    </Box>
  );
}
