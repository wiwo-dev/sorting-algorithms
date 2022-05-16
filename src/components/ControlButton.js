import { Box, Button, Icon, Tooltip } from "@chakra-ui/react";
import React from "react";
import { MdOutlineSkipPrevious } from "react-icons/md";

export default function ControlButton({
  onClick,
  disabledTooltip,
  normalTooltip,
  disabled = false,
  width = "30px",
  icon = MdOutlineSkipPrevious,
  ...rest
}) {
  return (
    <>
      <Box {...rest}>
        <Tooltip label={disabled ? disabledTooltip : normalTooltip}>
          <Box
            as={"button"}
            width={width}
            height="30px"
            rounded={"full"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            borderWidth={"2px"}
            color="black"
            borderColor="black"
            opacity={!disabled ? 1 : 0.4}
            bg="yellow.100"
            boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)"
            _focus={
              !disabled
                ? {
                    boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5) !important",
                    //bg: "yellow.300",
                  }
                : { boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5) !important" }
            }
            _hover={!disabled ? { bg: "yellow.200", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)" } : {}}
            _active={
              !disabled
                ? {
                    boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)",
                    bg: "yellow.300",
                    transform: "scale(0.95)",
                    borderColor: "black",
                  }
                : {}
            }
            onClick={!disabled ? onClick : () => {}}
            {...rest}>
            <Icon as={icon} w="24px" h="24px" />
          </Box>
          {/* </Button> */}
        </Tooltip>
      </Box>
    </>
  );
}
