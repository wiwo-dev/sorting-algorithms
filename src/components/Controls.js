import { Box, Icon, HStack, Button, Tooltip } from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import React, { useContext } from "react";

import {
  MdOutlineSkipNext,
  MdOutlineSkipPrevious,
  MdOutlinePlayArrow,
  MdPause,
  MdOutlineShuffle,
} from "react-icons/md";
import ControlButton from "components/ControlButton";

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
      <ControlButton
        onClick={handlePrevButtonClick}
        icon={MdOutlineSkipPrevious}
        disabled={
          sortingStatus === "NO_ORDERS" || sortingStatus === "FIRST_ORDER_WAITING" || sortingStatus === "ORDERS_RUNNING"
        }
        disabledTooltip={
          sortingStatus === "NO_ORDERS" || sortingStatus === "FIRST_ORDER_WAITING"
            ? "No more previous steps"
            : "Sorting is running"
        }
        normalTooltip="Step back"
      />

      <ControlButton
        onClick={handleSortPauseResumeButtonClick}
        icon={sortingStatus === "ORDERS_RUNNING" ? MdPause : MdOutlinePlayArrow}
        disabled={!selectedAlgorithm || sortingStatus === "ORDERS_FINISHED"}
        disabledTooltip="Select algorithm first"
        normalTooltip="Start sorting"
        width="60px"
      />

      <ControlButton
        onClick={handleNextButtonClick}
        icon={MdOutlineSkipNext}
        disabled={sortingStatus === "ORDERS_FINISHED" || !selectedAlgorithm || sortingStatus === "ORDERS_RUNNING"}
        disabledTooltip={
          sortingStatus === "ORDERS_FINISHED"
            ? "No more next steps"
            : !selectedAlgorithm
            ? "Select algorithm first"
            : "Sorting is running"
        }
        normalTooltip="Step forward"
      />

      <ControlButton
        onClick={handleShuffleButtonClick}
        icon={MdOutlineShuffle}
        marginLeft="20px"
        normalTooltip="Shuffle"
      />
    </HStack>
  );
}
