import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  HStack,
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
  Link,
  Divider,
} from "@chakra-ui/react";
import AlgorithmSelect from "../AlgorithmSelect";

import { MdSettings } from "react-icons/md";

import SubHeadline from "./SubHeadline";
import Controls from "../Controls";
import SpeedLengthSliders from "../SpeedLengthSliders";
import SortingVisualizerLogo from "components/SortingVisualizerLogo";
import ThumbUp from "./ThumbUp";

export default function InfoModal({ onOpen, onClose, isOpen }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside" size="xl">
        <ModalOverlay />
        <ModalContent bgColor={"blue.100"} marginTop="2rem">
          <ModalHeader textColor={"white"} fontFamily="Comfortaa" fontWeight={700}>
            <HStack>
              <SortingVisualizerLogo />
              <Text>Sorting Visualizer</Text>
            </HStack>
          </ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody textColor={"white"}>
            <Text>This is Sorting Algorithms Visualizer. Use it to understand how sorting algorithms work.</Text>
            <Text marginTop="1rem">
              You can go step by step in both directions or set a speed and watch how it works on a given array of
              stripes.
            </Text>
            <SubHeadline>How to use it?</SubHeadline>
            <Text marginTop="0.5rem">Step 1: Choose a sorting algorithm</Text>
            <Box width={"100%"} marginTop="0.5rem">
              <AlgorithmSelect />
            </Box>
            <Text marginTop="1rem">You can choose from:</Text>
            <List spacing={0} paddingLeft="1rem">
              <ListItem>
                <ListIcon as={MdSettings} color="yellow.100" />
                <Link href="https://en.wikipedia.org/wiki/Bubble_sort" target={"_blank"} textDecoration="underline">
                  Bubble sort
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color="yellow.100" />
                <Link href="https://en.wikipedia.org/wiki/Selection_sort" target={"_blank"} textDecoration="underline">
                  Selection sort
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color="yellow.100" />
                <Link href="https://en.wikipedia.org/wiki/Insertion_sort" target={"_blank"} textDecoration="underline">
                  Insertion sort
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color="yellow.100" />
                <Link href="https://en.wikipedia.org/wiki/Merge_sort" target={"_blank"} textDecoration="underline">
                  Merge sort
                </Link>
              </ListItem>
              <ListItem>
                <ListIcon as={MdSettings} color="yellow.100" />
                <Link href="https://en.wikipedia.org/wiki/Quick_sort" target={"_blank"} textDecoration="underline">
                  Quick sort
                </Link>
              </ListItem>
            </List>
            <Text marginTop="1rem" marginBottom="1rem">
              Step 2: Pres PLAY to run selected algorithm or pres STEP FORWARD or STEP BACKWARD to go step by step.
              Press SHUFFLE to shuffle the array of stripes.
            </Text>
            <Controls />

            <Text marginTop="1rem">You can change the speed and change the amount of stripes.</Text>
            <Box width={"100%"} marginTop="0.5rem" marginBottom={"2.5rem"}>
              <SpeedLengthSliders />
            </Box>
            <SubHeadline>Stripes color meaning</SubHeadline>
            <Box
              display="flex"
              flexWrap={"wrap"}
              flexDirection={"row"}
              gridGap={3}
              marginTop="0.5rem"
              marginBottom={"2.5rem"}>
              <HStack>
                <Box
                  boxShadow="2px 2px 1px rgba(0, 0, 0, 0.3)"
                  borderWidth="2px"
                  borderTopWidth="0px"
                  borderColor="black"
                  roundedBottom={"full"}
                  bgColor={"gray.100"}
                  height={`30px`}
                  width={`15px`}
                />
                <Text textColor={"white"} fontFamily="Comfortaa" fontWeight={700} fontSize="small">
                  Unsorted
                </Text>
              </HStack>
              <HStack>
                <Box
                  boxShadow="2px 2px 1px rgba(0, 0, 0, 0.3)"
                  borderWidth="2px"
                  borderTopWidth="0px"
                  borderColor="black"
                  roundedBottom={"full"}
                  bgColor={"green.100"}
                  height={`30px`}
                  width={`15px`}
                />
                <Text textColor={"white"} fontFamily="Comfortaa" fontWeight={700} fontSize="small">
                  Sorted
                </Text>
              </HStack>

              <HStack>
                <Box
                  boxShadow="2px 2px 1px rgba(0, 0, 0, 0.3)"
                  borderWidth="2px"
                  borderTopWidth="0px"
                  borderColor="black"
                  roundedBottom={"full"}
                  bgColor={"yellow.100"}
                  height={`30px`}
                  width={`15px`}
                />
                <Text textColor={"white"} fontFamily="Comfortaa" fontWeight={700} fontSize="small">
                  Swapping
                </Text>
              </HStack>
              <HStack>
                <Box
                  boxShadow="2px 2px 1px rgba(0, 0, 0, 0.3)"
                  borderWidth="2px"
                  borderTopWidth="0px"
                  borderColor="black"
                  roundedBottom={"full"}
                  bgColor={"violet.100"}
                  height={`30px`}
                  width={`15px`}
                />
                <Text textColor={"white"} fontFamily="Comfortaa" fontWeight={700} fontSize="small">
                  Comparing / Taking From Auxillary Space
                </Text>
              </HStack>
            </Box>
            <Divider />
            <SubHeadline>More about the project</SubHeadline>
            <Text marginTop="0.5rem">
              If you would like to check the source code, or get more information about this project, check my page’s
              article about it or see the code on GitHub. Yes, you can copy paste it, if needed ;)
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              bgColor="yellow.100"
              borderWidth="2px"
              borderColor="black"
              mr={3}
              onClick={onClose}
              textColor="black"
              boxShadow="2px 2px 0px rgba(0, 0, 0, 0.5)">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
