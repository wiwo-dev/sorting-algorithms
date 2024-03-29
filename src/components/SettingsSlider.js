import { HStack, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react";
import React, { useState } from "react";

export default function SettingsSlider({ label, value, ...rest }) {
  //const [value, setValue] = useState(startValue || 20);

  return (
    <HStack>
      {label && (
        <Text fontFamily="Comfortaa" fontWeight={700} color="white" marginRight="10px">
          {label}
        </Text>
      )}
      <Slider minW="200px" colorScheme="pink" step={1} maxW="300px" {...rest}>
        <SliderTrack height="10px" rounded="lg" borderColor="black" borderWidth="2px">
          <SliderFilledTrack bgColor="yellow.100" />
        </SliderTrack>
        <SliderThumb
          boxSize={6}
          bgColor="yellow.100"
          _hover={{ bg: "yellow.200" }}
          borderColor="black"
          borderWidth="2px"
          alignItems="center"
          justifyContent="center"
          boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
          <Text fontFamily="Comfortaa" fontWeight={700} color="black" fontSize="10px">
            {value}
          </Text>
        </SliderThumb>
      </Slider>
    </HStack>
  );
}
