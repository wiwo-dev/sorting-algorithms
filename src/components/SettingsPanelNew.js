import { Box, HStack, Icon, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import SettingsSlider from "components/SettingsSlider";
import React, { useContext, useState } from "react";
import AlgorithmSelect from "./AlgorithmSelect";
import Controls from "components/Controls";

import useWindowWidth from "helpers/useWindowWidth";

import { MdExpandMore, MdExpandLess } from "react-icons/md";

import { motion, AnimatePresence } from "framer-motion";
import { SettingsContext } from "helpers/SettingsContext";

export default function SettingsPanelNew() {
  const { setStripesCount, speed, setSpeed, stripesCount } = useContext(SettingsContext);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { width: windowWidth } = useWindowWidth();

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
      {windowWidth <= 500 ? (
        <Box
          minH="70px"
          bgColor="blue.100"
          height={`${isMenuOpen ? "270px" : "110px"}`}
          position={"relative"}
          style={{ transition: "height 0.5s ease-in-out" }}>
          <Box
            style={{ transition: "all 0.5s ease-in-out" }}
            position={"absolute"}
            top={`${isMenuOpen ? "0px" : "-160px"}`}
            height="280px"
            width="100%"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            flexDirection={"column"}
            gridGap="20px"
            alignItems="center">
            <AlgorithmSelect />
            <SettingsSlider
              label="Speed"
              min={0}
              max={200}
              value={speedToValue(speed)}
              defaultValue={speedToValue(speed)}
              onChange={handleChangeSpeed}
            />
            <SettingsSlider
              label="Length"
              min={0}
              max={100}
              value={stripesCount}
              defaultValue={10}
              onChange={setStripesCount}
            />
            <Controls />

            <Icon
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
          gridGap="20px"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap">
          <AlgorithmSelect />
          <SettingsSlider label="Speed" startValue={20} />
          <SettingsSlider label="Length" startValue={20} />
          <Controls />
        </Box>
      )}
    </>
  );
}
