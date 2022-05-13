import { HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function SettingsSlider({ label, value, ...rest }) {
  //const [value, setValue] = useState(startValue || 20);

  return (
    <HStack>
      <Text fontFamily="Comfortaa" fontWeight={700} color="white" marginRight="10px">
        {label}
      </Text>
      <Slider minW="200px" colorScheme="pink" step={1} maxW="300px" {...rest}>
        <SliderTrack height="10px" rounded="lg" borderColor="black" borderWidth="2px">
          <SliderFilledTrack bgColor="yellow.100" />
        </SliderTrack>
        <SliderThumb
          boxSize={6}
          bgColor="yellow.100"
          borderColor="black"
          borderWidth="2px"
          alignItems="center"
          justifyContent="center">
          <Text fontFamily="Comfortaa" fontWeight={700} color="black" fontSize="10px">
            {value}
          </Text>
        </SliderThumb>
      </Slider>
    </HStack>
  );
}
