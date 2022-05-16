import { VStack } from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import useWindowWidth from "helpers/useWindowWidth";
import React, { useContext } from "react";
import SettingsSlider from "./SettingsSlider";

export default function SpeedLengthSliders({}) {
  const { stripeWidth, setStripesCount, speed, setSpeed, speedToValue, handleSpeedChange, stripesCount } =
    useContext(SettingsContext);

  const { width: windowWidth } = useWindowWidth();

  return (
    <VStack alignItems={"start"}>
      <SettingsSlider
        label="Speed"
        min={1}
        max={5}
        step={1}
        value={speedToValue(speed)}
        defaultValue={speedToValue(speed)}
        onChange={handleSpeedChange}
      />
      <SettingsSlider
        label="Length"
        min={0}
        max={Math.floor(windowWidth / (stripeWidth + 10))}
        value={stripesCount}
        defaultValue={stripesCount}
        onChange={setStripesCount}
      />
    </VStack>
  );
}
