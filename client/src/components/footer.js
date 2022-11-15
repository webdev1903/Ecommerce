import { Flex, Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Flex
      direction={["column", "row", "row"]}
      flexWrap="wrap"
      backgroundColor="grey"
      justify="space-between"
      align="center"
      bottom="0px"
      gap={["20px", "0", "0"]}
    >
      <Box>
        <Text>About Us</Text>
        <Text>Contact Us</Text>
        <Text>Work for Us</Text>
        <Text>File a complaint</Text>
      </Box>
      <Box>
        <Text>Made by Prakash with ❣️ from India</Text>
      </Box>
      <Box>
        <Text>Our Social Media Handles</Text>
        <Text>LinkedIn</Text>
        <Text>Facebook</Text>
        <Text>YouTube</Text>
        <Text>Instagram</Text>
        <Text>Twitter</Text>
      </Box>
    </Flex>
  );
}
