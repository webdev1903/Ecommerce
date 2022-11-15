import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import {
  Flex,
  Box,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Button,
  Text,
  Image,
  Heading,
} from "@chakra-ui/react";
import { Token, AuthStatus, User } from "../context/AuthContext/action";
import { Navigate } from "react-router-dom";
import axios from "axios";

const getOrders = async (token) => {
  const res = await axios.get(`/orders`, {
    headers: { authorization: `Bearer ${token}` },
  });
  // console.log(res);
  return res;
};

export default function Account() {
  const { state, dispatch } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  // console.log(orders);
  const userDetails = state.user;

  useEffect(() => {
    getOrders(state.token).then((res) => setOrders(res.data));
  }, []);
  const handleLogout = () => {
    dispatch({ type: AuthStatus });
    dispatch({ type: Token, payload: "" });
    dispatch({ type: User, payload: {} });
    return <Navigate to="/home" />;
  };
  return (
    <Flex direction="column" justify="center" align="center">
      <Box>Account Details</Box>
      <Table>
        <Tbody>
          <Tr>
            <Th>Name</Th>
            <Td>{userDetails.name}</Td>
          </Tr>
          <Tr>
            <Th>Email</Th>
            <Td>{userDetails.email}</Td>
          </Tr>
          <Tr>
            <Th>Contact no</Th>
            <Td>{userDetails.contact}</Td>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={handleLogout}>Logout</Button>
      <br />
      {orders.length > 0 && <Heading>Past Orders</Heading>}
      <Flex
        direction="column"
        padding={["5px", "10px", "20px"]}
        gap={["5px", "10px", "20px"]}
        w="100%"
      >
        {orders.length > 0 &&
          orders.map((e) => (
            <Box border="3px solid" borderColor="black">
              <Text>
                <Heading size="medium">Order Id: {e.orderId}</Heading> Ordered
                Date: {e.createdAt.split("T")[0]}
              </Text>
              {e.products.map((elem) => (
                <Flex
                  direction={["column", "row", "row"]}
                  border="1px solid"
                  borderColor="black"
                  justify="space-between"
                  align="center"
                  gap={["2px", "10px", "10px"]}
                  padding={["2px", "10px", "20px "]}
                >
                  <Image
                    src={elem.product_id.image}
                    h={["5", "10", "10"]}
                    w={["5", "10", "10"]}
                  />
                  <Text>{elem.product_id.title.slice(0, 20)}...</Text>
                  <Text>Price : {elem.product_id.price}</Text>
                  <Text>Quantity : {elem.quantity}</Text>
                </Flex>
              ))}
              <Heading size="small">Total: {e.total}</Heading>
            </Box>
            // <Text>Works</Text>
          ))}
      </Flex>
    </Flex>
  );
}
