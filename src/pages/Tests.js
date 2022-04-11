import React from "react";
import {
  AnimatePresence,
  AnimateSharedLayout,
  motion,
  useAnimation,
  useAnimationFrame,
  isValidMotionProp,
} from "framer-motion";
import { Box, Heading, chakra } from "@chakra-ui/react";

export default function Tests() {
  const ChakraBox = chakra(motion.div, { shouldForwardProp: () => true });

  return (
    <>
      <div>Tests</div>
      <motion.div
        animate={{ backgroundColor: ["#ffccff", "#00cc66", "#1155dd"], x: [0, 100, 200, 300, 400] }}
        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
        style={{ width: "100px", height: "100px" }}></motion.div>

      <Heading>Normal box</Heading>
      <Box
        width="100px"
        height="100px"
        backgroundColor="#1155dd"
        animate={{ backgroundColor: ["#ffccff", "#00cc66"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}></Box>

      <Heading> box as</Heading>
      <Box
        as={motion.div}
        width="100px"
        height="100px"
        backgroundColor="#1155dd"
        animate={{ backgroundColor: ["#ffccff", "#00cc66"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}></Box>

      <Heading>Chakra factory</Heading>
      <ChakraBox
        width="100px"
        height="100px"
        animate={{ backgroundColor: ["#ffccff", "#00cc66"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}></ChakraBox>
    </>
  );
}
