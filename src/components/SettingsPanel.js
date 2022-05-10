import {
  Box,
  Button,
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

export default function SettingsPanel() {
  const {
    isRunning,
    handleToggleIsRunning,
    isSortingOn,
    setIsSortingOn,
    handleQuickShuffleClick,
    makeNextStep,
    makePreviousStep,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    clearColors,
  } = useContext(SettingsContext);

  const maxSpeed = 100;
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
      <Box
        minH="70px"
        bgColor="orange.200"
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gridGap="20px"
        alignItems="center">
        <Button onClick={makePreviousStep}>PREV</Button>
        <Button
          onClick={() => {
            isSortingOn ? handleToggleIsRunning() : handleSort();
          }}>
          {isRunning ? "PAUSE" : isSortingOn ? "RESUME" : "SORT"}
        </Button>
        <Button onClick={makeNextStep}>NEXT</Button>
        <Button onClick={handleQuickShuffleClick}>SHUFFLE</Button>
        <Select
          id="algo"
          placeholder="Select algorithm"
          onChange={(ev) => {
            if (isSortingOn) {
              clearColors();
              setIsSortingOn(false);
            }
            setSelectedAlgorithm(ev.target.value);
          }}
          default="bubbleSort"
          width="250px">
          <option value="bubbleSort">bubbleSort</option>
          <option value="mergeSort">mergeSort</option>
        </Select>
        <Button onClick={handleSort}>SORT {selectedAlgorithm}</Button>
        <VStack minW="200px">
          <Text fontSize="xs" minW="30px">
            Speed: {speedToValue(speed)}
          </Text>
          <Slider
            colorScheme="pink"
            min={0}
            max={100}
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
