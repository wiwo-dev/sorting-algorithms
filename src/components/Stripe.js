import { Box, Text } from "@chakra-ui/react";
import React from "react";

export const Stripe = (props) => {
  const { height, comparing, swapping, num, color, active, sorted } = props;
  return (
    <Box
      height={`${height}px`}
      className="transition-all"
      width="20px"
      bgColor={
        active !== false
          ? active
          : sorted.includes(num)
          ? "green"
          : //   : swapping.includes(num)
          //   ? "pink"
          comparing.includes(num)
          ? "yellow"
          : color
      }
      display="flex"
      justifyContent="center">
      <Text fontSize="xs">{num}</Text>
    </Box>
  );
};
