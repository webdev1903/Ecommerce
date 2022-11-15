import { Box, Flex, Button, Text, Divider } from "@chakra-ui/react";
import { useEffect, useState, useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import Address from "../components/address";
import AllAddresses from "../components/allAddresses";
import { useNavigate } from "react-router-dom";
import OrderTotal from "../components/orderTotal";
import { useSelector } from "react-redux";

export default function Checkout() {
  const { state } = useContext(AuthContext);
  const id = state.user._id;
  const token = state.token;
  const [addresses, setAddresses] = useState([]);
  const [addressState, setAddressState] = useState(false);
  const navigate = useNavigate();
  const { address } = useSelector((store) => store.cart);

  const getAddresses = async () => {
    const res = await axios.get(`addresses/${id}`, {
      headers: { authorization: `Bearer ${token}` },
    });
    return res;
  };
  useEffect(() => {
    getAddresses().then((res) => setAddresses(res.data));
  }, []);
  function addressModel() {
    setAddressState(!addressState);
  }

  return (
    <Box position="relative">
      <Flex direction="row" flexWrap="wrap" justify="center">
        <Box w={["100%", "50%", "50%"]}>
          {addresses.length > 0 && <AllAddresses addresses={addresses} />}
          <Button onClick={addressModel}>Add Address</Button>
          {addressState && <Address addressModel={addressModel} />}
        </Box>
        <Box
          margin="25px"
          border="1px solid"
          borderColor="black"
          h="fit-content"
          w="250px"
        >
          <Button
            onClick={() => {
              if (!address.address_line_1) {
                alert("please select an address");
              } else {
                navigate("/ordersummary");
              }
            }}
          >
            Use this address
          </Button>
          <Text noOfLines={4}>
            Choose an address to continue checking out. You will still have a
            chance to review and edit your order before it is final.
          </Text>
          <Divider />
          <OrderTotal />
        </Box>
      </Flex>
    </Box>
  );
}
