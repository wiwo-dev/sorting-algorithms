import { Box, Icon, HStack, Button } from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import React, { useContext } from "react";

import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdOutlinePlayArrow,
  MdPause,
  MdOutlineShuffle,
} from "react-icons/md";

export default function Controls() {
  const {
    handlePrevButtonClick,
    handleNextButtonClick,
    handleShuffleButtonClick,
    handleSortPauseResumeButtonClick,
    sortingStatus,
    selectedAlgorithm,
  } = useContext(SettingsContext);

  return (
    <HStack>
      <Button
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "transparent" }}
        marginX="0px"
        paddingX="0px"
        onClick={handlePrevButtonClick}
        disabled={
          sortingStatus === "NO_ORDERS" || sortingStatus === "FIRST_ORDER_WAITING" || sortingStatus === "ORDERS_RUNNING"
        }>
        <Box
          bg={"yellow.100"}
          width="30px"
          height="30px"
          rounded={"full"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          borderColor="black"
          borderWidth={"2px"}
          boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
          <Icon as={MdOutlineSkipPrevious} w="24px" h="24px" />
        </Box>
      </Button>

      <Button
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "transparent" }}
        marginX="0px"
        paddingX="0px"
        onClick={handleSortPauseResumeButtonClick}
        disabled={!selectedAlgorithm}>
        <Box
          bg={"yellow.100"}
          width="60px"
          height="30px"
          rounded={"full"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          borderColor="black"
          borderWidth={"2px"}
          boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
          <Icon as={sortingStatus === "ORDERS_RUNNING" ? MdPause : MdOutlinePlayArrow} w="24px" h="24px" />
        </Box>
      </Button>
      <Button
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "transparent" }}
        marginX="0px"
        paddingX="0px"
        onClick={handleNextButtonClick}
        disabled={sortingStatus === "ORDERS_FINISHED" || !selectedAlgorithm || sortingStatus === "ORDERS_RUNNING"}>
        <Box
          bg={"yellow.100"}
          width="30px"
          height="30px"
          rounded={"full"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          borderColor="black"
          borderWidth={"2px"}
          boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
          <Icon as={MdOutlineSkipNext} w="24px" h="24px" />
        </Box>
      </Button>
      <Button
        bgColor="transparent"
        _hover={{ bgColor: "transparent" }}
        _active={{ bgColor: "transparent" }}
        marginX="0px"
        paddingLeft="20px"
        paddingRight="0px"
        onClick={handleShuffleButtonClick}>
        <Box
          bg={"yellow.100"}
          width="30px"
          height="30px"
          rounded={"full"}
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          borderColor="black"
          borderWidth={"2px"}
          boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
          <Icon as={MdOutlineShuffle} w="24px" h="24px" />
        </Box>
      </Button>
    </HStack>
  );
}
