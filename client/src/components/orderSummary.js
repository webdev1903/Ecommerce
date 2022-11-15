import {
  Box,
  Flex,
  Text,
  Image,
  Heading,
  Input,
  FormLabel,
  Button,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useState } from "react";
import { getCartItems } from "../redux/cart/cart.actions";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const { data, total, subtotal, discount, promoCode } = useSelector(
    (store) => store.cart
  );
  return (
    <Box>
      <Heading size="s">Order Summary</Heading>
      <Flex
        direction="column"
        h="350px"
        overflowY="scroll"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {data.map((e, i) => (
          <Flex
            direction="row"
            gap="20px"
            justify="center"
            align="center"
            border="1px solid"
            borderColor="black"
            key={i}
          >
            <Image src={e.product_id.image} h="100px" w="100px" />
            <Box>
              <Text>{e.product_id.title.slice(0, 35)}...</Text>
              <Text>Quantity: {e.quantity}</Text>
              <Text>Price: {e.product_id.price}</Text>
            </Box>
          </Flex>
        ))}
      </Flex>
      <Table>
        <Tbody>
          <Tr>
            <Td>Sub Total : </Td>
            <Td>{subtotal}</Td>
          </Tr>
          <Tr>
            <Td>Discount : </Td>
            <Td>{discount}</Td>
          </Tr>
          <Tr>
            <Td>Total : </Td>
            <Td>{total}</Td>
          </Tr>
          {promoCode.length > 0 && (
            <Tr>
              <Td>
                <Text color="green" fontSize="bold" d="inline">
                  "{promoCode}"
                </Text>{" "}
                promo code applied
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Box>
  );
}
