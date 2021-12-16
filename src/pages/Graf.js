import { Heading, Box, Grid, GridItem, HStack, Center } from "@chakra-ui/react";
import React from "react";

class Node {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

const DrawNode = (node) => {
  return (
    <Box minW="100px" minH="100px">
      <Grid
        h="150px"
        w="150px"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(3, 1fr)"
        gap={0}
        bgColor="gray.100">
        <GridItem
          colStart={2}
          rowStart={1}
          rowSpan={1}
          colSpan={1}
          bg="pink"
          rounded="xl"
          display="grid"
          justifyContent="center"
          alignItems="center">
          VAL
        </GridItem>

        <GridItem
          colStart={1}
          rowStart={3}
          rowSpan={1}
          colSpan={1}
          bg="tomato"
          rounded="xl"
          display="grid"
          justifyContent="center"
          alignItems="center">
          LEFT
        </GridItem>
        <GridItem
          colStart={3}
          rowStart={3}
          rowSpan={1}
          colSpan={1}
          bg="tomato"
          rounded="xl"
          display="grid"
          justifyContent="center"
          alignItems="center">
          RIGHT
        </GridItem>
        <GridItem
          colStart={1}
          rowStart={2}
          rowSpan={1}
          colSpan={1}
          bg=""
          display="flex"
          justifyContent="center"
          alignItems="center">
          1<Box bgColor="black" h="150%" w="3px" className="rotate-45 translate-x-3 "></Box>
        </GridItem>
        <GridItem
          colStart={3}
          rowStart={2}
          rowSpan={1}
          colSpan={1}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <Box bgColor="black" h="150%" w="3px" className="-rotate-45 -translate-x-3 "></Box>1
        </GridItem>
      </Grid>
    </Box>
  );
};

export const Graf = () => {
  return (
    <Box minW="500px" display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Heading>Graf</Heading>
      <Box display="flex" flexDirection="column" alignItems="center">
        <DrawNode />
        <HStack>
          <DrawNode />
          <DrawNode />
        </HStack>
      </Box>
    </Box>
  );
};
