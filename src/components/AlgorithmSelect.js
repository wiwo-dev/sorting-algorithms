import { Icon, Select } from "@chakra-ui/react";
import { SettingsContext } from "helpers/SettingsContext";
import React, { useContext } from "react";
import { RiSortDesc } from "react-icons/ri";

export default function AlgorithmSelect({ width = "250px" }) {
  const { selectedAlgorithm, handleAlgorithmChange } = useContext(SettingsContext);

  return (
    <Select
      icon={<Icon as={RiSortDesc} />}
      id="algo"
      placeholder="Select algorithm"
      onChange={(ev) => {
        handleAlgorithmChange(ev.target.value);
      }}
      //defaultValue={selectedAlgorithm}
      value={selectedAlgorithm}
      width={width}
      bgColor={"yellow.100"}
      borderColor="black"
      focusBorderColor="black"
      borderWidth={"2px"}
      boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)"
      _hover={{ borderColor: "black", boxShadow: "2px 2px 0px rgba(0, 0, 0, 0.5)", bg: "yellow.200" }}
      color="black">
      <option value="bubbleSort">bubbleSort</option>
      <option value="selectionSort">selectionSort</option>
      <option value="insertionSort">insertionSort</option>
      <option value="mergeSort">mergeSort</option>
      <option value="quickSort">quickSort</option>
    </Select>
  );
}
