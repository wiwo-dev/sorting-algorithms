import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import Bar from "./Bar";

import { SettingsContext } from "helpers/SettingsContext";

export default function StripesGroup() {
  const {
    stripesOrdered,
    isRunning,
    handleToggleStatus,
    handleQuickShuffleClick,
    selectedAlgorithm,
    setSelectedAlgorithm,
    handleSort,
    speed,
    setSpeed,
    stripesCount,
    setStripesCount,
    getColor,
  } = useContext(SettingsContext);
  return (
    <>
      <Box position="relative">
        {stripesOrdered.map((str, i) => {
          const distance = document.body.clientWidth / stripesCount;
          return (
            <motion.div
              key={i}
              animate={{ x: str.position * distance }}
              transition={{ duration: 0.1 }}
              style={{ position: "absolute" }}>
              <Bar x={str.position * distance} height={str.height} color={getColor(str)} />
            </motion.div>
          );
        })}
      </Box>
    </>
  );
}
