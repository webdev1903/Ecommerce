import { Box, Text, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function PopOver({ data }) {
  const navigate = useNavigate();
  // console.log(data);
  return (
    <Flex
      direction="column"
      position="absolute"
      top="50px"
      backgroundColor="white"
      width="500px"
      maxH="400px"
      overflowY="scroll"
      zIndex="20"
      css={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {data.map((el) => (
        <Box
          key={el.id}
          border="1px solid"
          borderColor="black"
          padding="5px"
          onClick={() => navigate("/products")}
        >
          <Text>{el.title}</Text>
        </Box>
      ))}
    </Flex>
  );
}
