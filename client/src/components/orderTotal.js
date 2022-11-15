import { useSelector } from "react-redux";
import { Table, Tbody, Tr, Td, Text, Heading, Box } from "@chakra-ui/react";

export default function Total() {
  const { data, total, subtotal, discount, promoCode } = useSelector(
    (store) => store.cart
  );
  return (
    <Box>
      <Heading size="small">Order Total</Heading>
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
