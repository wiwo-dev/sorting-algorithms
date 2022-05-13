import {
  Box,
  Button,
  HStack,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import { useContext } from "react";

import { Icon } from "@chakra-ui/react";
import { RiSortDesc } from "react-icons/ri";

export default function SettingsPanel() {
  const {
    handleShuffleButtonClick,
    handleSortPauseResumeButtonClick,
    makeNextStep,
    handlePrevButtonClick,
    handleNextButtonClick,
    makePreviousStep,
    selectedAlgorithm,
    handleAlgorithmChange,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    sortingStatus,
  } = useContext(SettingsContext);

  const maxSpeed = 200;
  const handleChangeSpeed = (val) => {
    //min speed - 1
    // max speed - 30
    setSpeed(maxSpeed - val);
  };

  const speedToValue = (speed) => {
    return maxSpeed - speed;
  };

  return (
    <>
      <Box bgColor="gray.400">{sortingStatus}</Box>
      <Box
        minH="70px"
        bgColor="orange.200"
        display="flex"
        flexDirection={["column", "row"]}
        flexWrap="wrap"
        justifyContent="center"
        gridGap="20px"
        alignItems="center"
        paddingY="20px">
        <Select
          icon={<Icon as={RiSortDesc} />}
          id="algo"
          placeholder="Select algorithm"
          onChange={(ev) => {
            handleAlgorithmChange(ev.target.value);
          }}
          default="bubbleSort"
          width="250px">
          <option value="bubbleSort">bubbleSort</option>
          <option value="mergeSort">mergeSort</option>
          <option value="quickSort">quickSort</option>
        </Select>
        <HStack>
          <Button
            disabled={
              sortingStatus === "NO_ORDERS" ||
              sortingStatus === "FIRST_ORDER_WAITING" ||
              sortingStatus === "ORDERS_RUNNING"
            }
            onClick={handlePrevButtonClick}>
            PREV
          </Button>
          <Button disabled={!selectedAlgorithm} onClick={handleSortPauseResumeButtonClick}>
            {sortingStatus === "ORDERS_RUNNING" ? "PAUSE" : sortingStatus === "ORDERS_WAITING" ? "RESUME" : "SORT"}
          </Button>
          <Button
            disabled={sortingStatus === "ORDERS_FINISHED" || !selectedAlgorithm || sortingStatus === "ORDERS_RUNNING"}
            onClick={handleNextButtonClick}>
            NEXT
          </Button>
        </HStack>

        <Button onClick={handleShuffleButtonClick}>SHUFFLE</Button>
        <VStack minW="200px">
          <Text fontSize="xs" minW="30px">
            Speed: {speedToValue(speed)}
          </Text>
          <Slider
            colorScheme="pink"
            min={0}
            max={200}
            step={1}
            maxW="300px"
            defaultValue={speedToValue(speed)}
            onChange={handleChangeSpeed}>
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
          <Slider
            colorScheme="blue"
            min={0}
            max={100}
            maxW="300px"
            onChange={setStripesCount}
            defaultValue={stripesCount}>
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </VStack>
      </Box>
    </>
  );
}
