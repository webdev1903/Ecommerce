import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Image,
  Text,
  Button,
  Heading,
  Input,
} from "@chakra-ui/react";
import CartItem from "../components/cartItem";
import { useNavigate } from "react-router-dom";
import { Loading } from "../context/AuthContext/action";
import Promo from "../components/promo";
import { useSelector, useDispatch } from "react-redux";
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
} from "../redux/cart/cart.actions";

const getUser = async (token) => {
  const res = await axios.get(`/carts`, {
    headers: { authorization: `Bearer ${token}` },
  });
  return res;
};

export default function Cart() {
  const { state, dispatch } = useContext(AuthContext);
  const { data, subtotal, total, discount, promoCode } = useSelector(
    (store) => store.cart
  );
  const cartDispatch = useDispatch();
  const token = state.token;
  const navigate = useNavigate();
  // console.log(data);

  useEffect(() => {
    cartDispatch(getCartItems(state.token));
  }, []);

  if (state.loading) {
    return <h1>...Loading</h1>;
  }

  const handleCheckout = async () => {
    navigate("/checkout");
  };

  const handleQuantity = (id, quantity, x, token) => {
    cartDispatch(updateCartItem(id, { quantity: quantity + x }, token));
  };

  const handleRemove = (id, token) => {
    cartDispatch(removeCartItem(id, token));
  };

  if (data.length === 0) {
    return (
      <div>
        <h1>No items in Cart</h1>
        <Button onClick={() => navigate("/products")}>Shop for Products</Button>
      </div>
    );
  }
  return (
    <Box>
      <TableContainer>
        <Table variant="simple" colorScheme="whiteAlpha">
          <TableCaption placement="top">Cart Items</TableCaption>
          <Thead>
            <Tr textAlign="center">
              <Th>Product</Th>
              <Th>Quantity</Th>
              <Th>Price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((e, i) => (
              <CartItem
                token={token}
                image={e.product_id.image}
                title={e.product_id.title}
                price={e.product_id.price}
                quantity={e.quantity}
                handleQuantity={handleQuantity}
                handleRemove={handleRemove}
                key={Date.now() * Math.random()}
                _id={e._id}
              />
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>
                <Heading as="h6" size="md">
                  Grand Total
                </Heading>
              </Th>
              <Th></Th>
              <Th>
                <Heading as="h6" size="md">
                  {subtotal}
                </Heading>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
      <Promo total={total} discount={discount} subtotal={subtotal} />
      <Button onClick={handleCheckout}>Checkout</Button>
    </Box>
  );
}
