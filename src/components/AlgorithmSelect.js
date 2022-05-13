import { Icon, Select } from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import React, { useContext } from "react";
import { RiSortDesc } from "react-icons/ri";

export default function AlgorithmSelect() {
  const { handleAlgorithmChange } = useContext(SettingsContext);

  return (
    <Select
      icon={<Icon as={RiSortDesc} />}
      id="algo"
      placeholder="Select algorithm"
      onChange={(ev) => {
        handleAlgorithmChange(ev.target.value);
      }}
      default="bubbleSort"
      width="250px"
      bgColor={"yellow.100"}
      borderColor="black"
      focusBorderColor="black"
      borderWidth={"2px"}
      boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)"
      _hover={{ borderColor: "black", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)" }}>
      <option value="bubbleSort">bubbleSort</option>
      <option value="mergeSort">mergeSort</option>
      <option value="quickSort">quickSort</option>
    </Select>
  );
}
