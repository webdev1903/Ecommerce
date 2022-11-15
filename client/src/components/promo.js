import { useEffect, useState } from "react";
import { Box, Input, Button, Table, Tbody, Tr, Td } from "@chakra-ui/react";
import { updateCartTotal, setCartTotal } from "../redux/cart/cart.actions";
import { useDispatch, useSelector } from "react-redux";

export default function Promo() {
  // const [state, setState] = useState({ subtotal, discount, total, code: "" });
  const { total, subtotal, discount, promoCode } = useSelector(
    (store) => store.cart
  );
  const [code, setCode] = useState(promoCode);
  const [buttonText, setButtonText] = useState(
    discount === 0 ? "Apply" : "Remove"
  );
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setCartTotal());
  // }, []);
  const promo = () => {
    if (buttonText === "Remove") {
      setCode("");
      dispatch(setCartTotal());
    } else if (code == "ECOM20") {
      dispatch(updateCartTotal("ECOM20"));
      setButtonText("Remove");
    } else {
      setCode("");
      alert("Invalid promo code");
    }
  };

  return (
    <Box>
      Promo Code :{" "}
      <Input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        w="200px"
      ></Input>
      <Button onClick={promo}>{buttonText}</Button>
      <Table w="400px" margin="auto">
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
        </Tbody>
      </Table>
    </Box>
  );
}
