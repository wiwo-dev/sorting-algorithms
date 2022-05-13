import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

export default function InfoModal({ onOpen, onClose, isOpen }) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor={"blue.100"}>
          <ModalHeader textColor={"white"}>Sorting Visualizer</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody textColor={"white"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Commodi veniam aliquid quibusdam nulla voluptate
            dolore id sunt quas dignissimos cumque autem temporibus, quidem molestias nesciunt eaque placeat voluptates
            dolorem. Ducimus?
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
