import { useState } from "react";
import { Td, Tr, Image, Text, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
  getCartItems,
} from "../redux/cart/cart.actions";

export default function CartItem({
  image,
  title,
  price,
  quantity,
  _id,
  token,
  handleQuantity,
  handleRemove,
}) {
  const dispatch = useDispatch();

  return (
    <Tr>
      <Td>
        <Image src={image} h={["50px", "100px", "100px"]} />
        <Text>{title}</Text>
      </Td>
      <Td>
        <Button
          onClick={() => {
            if (quantity === 1) {
              handleRemove(_id, token);
            } else {
              handleQuantity(_id, quantity, -1, token);
            }
          }}
        >
          ➖
        </Button>
        <Button>{quantity}</Button>
        <Button onClick={handleQuantity.bind(null, _id, quantity, 1, token)}>
          ➕
        </Button>
      </Td>
      <Td>Rs. {price}</Td>
      <Td>
        <Button onClick={handleRemove.bind(null, _id, token)}>Remove</Button>
      </Td>
    </Tr>
  );
}
