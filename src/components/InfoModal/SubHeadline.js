import { HStack, Text } from "@chakra-ui/react";
import React from "react";

export default function SubHeadline({ children }) {
  return (
    <HStack marginTop={"1.8rem"}>
      <svg width={19} height={19} viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x={9} width={6} height={6} transform="rotate(45 9 0)" fill="#F6C944" />
        <rect x="9.24261" y="10.2426" width={6} height={6} transform="rotate(45 9.24261 10.2426)" fill="#F6C944" />
        <rect x="4.24261" y="5.24265" width={6} height={6} transform="rotate(45 4.24261 5.24265)" fill="#F6C944" />
        <rect x="14.2426" y="5.24265" width={6} height={6} transform="rotate(45 14.2426 5.24265)" fill="#F6C944" />
      </svg>
      <Text fontFamily="Comfortaa" fontWeight={700}>
        {children}
      </Text>
    </HStack>
  );
}
