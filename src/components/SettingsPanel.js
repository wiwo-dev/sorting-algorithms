import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
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
    handleToggleStatus,
    handleQuickShuffleClick,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
  } = useContext(SettingsContext);

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
        <Button onClick={handleToggleStatus}>{isRunning ? "OFF" : "ON"}</Button>
        <Button onClick={handleQuickShuffleClick}>SHUFFLE</Button>
        {/* <FormControl> */}
        {/* <FormLabel htmlFor="algo">Algorithm</FormLabel> */}
        <Select
          id="algo"
          placeholder="Select algorithm"
          onChange={(ev) => setSelectedAlgorithm(ev.target.value)}
          width="250px">
          <option value="bubbleSort">bubbleSort</option>
          <option value="mergeSort">mergeSort</option>
        </Select>
        {/* </FormControl> */}
        <Button onClick={handleSort}>SORT {selectedAlgorithm}</Button>

        <VStack minW="200px">
          <Text fontSize="xs" minW="30px">
            Speed: {speed}
          </Text>
          <Slider
            colorScheme="pink"
            min={0}
            max={100}
            step={5}
            maxW="300px"
            defaultValue={speed}
            onChange={(val) => setSpeed(val)}>
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
