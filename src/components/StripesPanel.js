import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SettingsContext } from "helpers/SettingsContext";
import useWindowWidth from "helpers/useWindowWidth";
import React, { useContext } from "react";

export default function StripesPanel() {
  const { stripesOrdered, stripesCount, getColor } = useContext(SettingsContext);

  const { width: windowWidth } = useWindowWidth();

  const stripeWidth = 20;

  return (
    <Box
      position="relative"
      height={window.innerHeight - 100}
      borderTopWidth="0px"
      borderColor="gray.100"
      marginTop="-2px"
      zIndex={0}>
      {stripesOrdered.map((str, i) => {
        const distance = windowWidth / stripesCount;
        return (
          <Box
            as={motion.div}
            key={i}
            animate={{ x: str.position * distance + distance / 2 - stripeWidth / 2 }}
            transition={{ duration: 0.1 }}
            boxShadow="2px 2px 1px rgba(0, 0, 0, 0.3)"
            borderWidth="2px"
            borderTopWidth="0px"
            borderColor="black"
            roundedBottom={"full"}
            bgColor={getColor(str)}
            position="absolute"
            height={`${str.height}px`}
            width={`${stripeWidth}px`}></Box>
        );
      })}
    </Box>
  );
}