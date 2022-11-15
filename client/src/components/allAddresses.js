import { Flex, Text, Box, Radio, RadioGroup, Heading } from "@chakra-ui/react";
import { setDeliveryAddress } from "../redux/cart/cart.actions";
import { useDispatch } from "react-redux";
import { useState } from "react";

export default function AllAddresses({ addresses }) {
  const dispatch = useDispatch();
  const [data, setData] = useState(addresses);
  return (
    <Box>
      <Heading size="s">Select an address</Heading>
      <RadioGroup>
        <Flex
          direction="column"
          justify="left"
          align="left"
          gap="20px"
          border="1px solid"
          borderColor="black"
          overflowY="scroll"
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {data.length > 0 &&
            data.map((e, i) => (
              <Radio
                value={e._id}
                size="lg"
                key={i}
                onChange={() => dispatch(setDeliveryAddress(e.address))}
              >
                <Box
                  // border="2px solid"
                  // borderColor="black"
                  textAlign="left"
                  width="maxWidth"
                >
                  <Text>{e.address.name}</Text>
                  <Text>{e.address.address_line_1}</Text>
                  <Text>{e.address.address_line_2}</Text>
                  <Text>
                    {e.address.city} {e.address.state} {e.address.pincode}
                  </Text>
                </Box>
              </Radio>
            ))}
        </Flex>
      </RadioGroup>
    </Box>
  );
}
