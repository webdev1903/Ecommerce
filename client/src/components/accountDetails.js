import { Box, Text, Flex, li } from "@chakra-ui/react";

export default function AccountDetails() {
  // console.log(data);
  return (
    <Flex
      direction="column"
      position="absolute"
      top="50px"
      backgroundColor="white"
      zIndex="21"
    >
      <li>Account Details</li>
      <li>Orders</li>
      <li>Logout</li>
    </Flex>
  );
}
