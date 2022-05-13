import { Box, HStack, Icon, SliderFilledTrack, SliderThumb, SliderTrack, Text, VStack } from "@chakra-ui/react";
import SettingsSlider from "components/SettingsSlider";
import React, { useContext, useState } from "react";
import AlgorithmSelect from "./AlgorithmSelect";
import Controls from "components/Controls";

import useWindowWidth from "helpers/useWindowWidth";

import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import { SettingsContext } from "helpers/SettingsContext";
import SpeedLengthSliders from "./SpeedLengthSliders";

export default function SettingsPanel() {
  const { stripeWidth, setStripesCount, speed, setSpeed, stripesCount } = useContext(SettingsContext);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { width: windowWidth } = useWindowWidth();

  //const maxSpeed = 300;

  const speeds = {
    1: 400,
    2: 300,
    3: 200,
    4: 100,
    5: 2,
  };

  const handleChangeSpeed = (val) => {
    setSpeed(speeds[val]);
  };
  const speedToValue = (speed) => {
    function getKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    }
    return getKeyByValue(speeds, speed);
    //return maxSpeed - speed;
  };

  const mobileMenuHeight = "210px";

  return (
    <>
      {windowWidth <= 600 ? (
        <Box
          minH="70px"
          bgColor="blue.100"
          height={`${isMenuOpen ? mobileMenuHeight : "75px"}`}
          position={"relative"}
          style={{ transition: "height 0.5s ease-in-out" }}
          zIndex={10}>
          <Box
            style={{ transition: "all 0.5s ease-in-out" }}
            position={"absolute"}
            bottom={"0px"}
            height={mobileMenuHeight}
            //bgColor={"pink"}
            width="100%"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            flexDirection={"column"}
            gridGap="20px"
            alignItems="center">
            <AlgorithmSelect />
            <SpeedLengthSliders handleChangeSpeed={handleChangeSpeed} speedToValue={speedToValue} />
            <Controls />
            <Icon
              position="absolute"
              bottom="30px"
              right="30px"
              as={MdExpandMore}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{ transform: `rotateZ(${isMenuOpen ? "900deg" : "0deg"})`, transition: "all 0.7s ease-in-out" }}
            />
          </Box>
        </Box>
      ) : (
        <Box
          minH="70px"
          bgColor="blue.100"
          display="flex"
          gridGap="40px"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          padding="20px"
          zIndex={10}
          position={"relative"}>
          <VStack>
            <AlgorithmSelect />
            <Controls />
          </VStack>
          <SpeedLengthSliders handleChangeSpeed={handleChangeSpeed} speedToValue={speedToValue} />
        </Box>
      )}
    </>
  );
}
