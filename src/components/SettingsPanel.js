import {
  Box,
  Grid,
  GridItem,
  HStack,
  Icon,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import SettingsSlider from "components/SettingsSlider";
import React, { useContext, useState } from "react";
import AlgorithmSelect from "./AlgorithmSelect";
import Controls from "components/Controls";
import useWindowWidth from "helpers/useWindowWidth";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { SettingsContext } from "helpers/SettingsContext";

import SortingVisualizerLogo from "./SortingVisualizerLogo";
import ControlButton from "./ControlButton";

import { TiInfoLarge } from "react-icons/ti";

export default function SettingsPanel({ onModalOpen }) {
  const {
    stripeWidth,
    setStripesCount,
    stripesCountMax,
    speed,
    setSpeed,
    speedToValue,
    handleSpeedChange,
    stripesCount,
  } = useContext(SettingsContext);

  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const { width: windowWidth } = useWindowWidth();

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
            width="100%"
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            flexDirection={"column"}
            gridGap="20px"
            alignItems="center">
            <Grid templateColumns="repeat(2, 1fr)" gap={2} width="310px">
              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Algorithm:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <AlgorithmSelect width="200px" />
              </GridItem>

              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Speed:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <SettingsSlider
                  //label="Speed"
                  min={1}
                  max={5}
                  step={1}
                  value={speedToValue(speed)}
                  defaultValue={speedToValue(speed)}
                  onChange={handleSpeedChange}
                />
              </GridItem>
              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Speed:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <SettingsSlider
                  //label="Length"
                  min={0}
                  max={stripesCountMax}
                  value={stripesCount}
                  defaultValue={stripesCount}
                  onChange={setStripesCount}
                />
              </GridItem>
            </Grid>

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
          position={"relative"}
          paddingLeft={windowWidth < 950 ? "150px" : "0px"}>
          <HStack justifyContent={"space-around"} width={"100%"} maxW={"1000px"}>
            <Box position="absolute" left="30px">
              <SortingVisualizerLogo />
            </Box>

            <Grid templateColumns="repeat(2, 1fr)" gap={2} width="310px">
              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Algorithm:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <AlgorithmSelect width="200px" />
              </GridItem>

              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Speed:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <SettingsSlider
                  //label="Speed"
                  min={1}
                  max={5}
                  step={1}
                  value={speedToValue(speed)}
                  defaultValue={speedToValue(speed)}
                  onChange={handleSpeedChange}
                />
              </GridItem>
              <GridItem w="100%" display={"fles"} alignItems={"center"} justifyContent={"flex-start"}>
                <Text fontFamily="Comfortaa" fontWeight={700} color="white">
                  Length:
                </Text>
              </GridItem>
              <GridItem w="100%">
                <SettingsSlider
                  //label="Length"
                  min={0}
                  max={stripesCountMax}
                  value={stripesCount}
                  defaultValue={stripesCount}
                  onChange={setStripesCount}
                />
              </GridItem>
            </Grid>
            <Controls />
          </HStack>
        </Box>
      )}
    </>
  );
}
