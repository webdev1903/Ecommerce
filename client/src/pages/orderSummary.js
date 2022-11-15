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
  Divider,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import OrderTotal from "../components/orderTotal";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import axios from "axios";
import { resetCart } from "../redux/cart/cart.actions";

export default function OrderSummary() {
  const { data, total, subtotal, discount, promoCode, address } = useSelector(
    (store) => store.cart
  );
  const { state, dispatch } = useContext(AuthContext);
  const token = state.token;
  const navigate = useNavigate();

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      document.body.appendChild(script);

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
    });
  };

  const handleOrder = async () => {
    const res = await loadRazorpay();
    if (!res) {
      alert("Load failed");
    }

    const paymentData = await axios
      .post(
        `/orders/razorpay`,
        {
          amount: Math.round(total),
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => res.data);

    const products = data.map((elem) => ({
      quantity: elem.quantity,
      product_id: elem.product_id,
    }));

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      currency: paymentData.currency,
      amount: paymentData.amount.toString(),
      order_id: paymentData.id,
      name: "E-commmerce",
      description: "Test Transaction",
      // image:
      //   "http:s//res.cloudinary.com/dgelxfhx7/image/upload/v1666703771/jvgug7aphyjql8m9dloi.png",

      handler: async function (response) {
        await axios
          .post(
            `/orders/razorpay/success`,
            {
              products,
              total,
              subtotal,
              discount,
              promoCode,
              address,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            },
            {
              headers: { authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log(res);
          });

        console.log("success");
        dispatch(resetCart());
        await axios
          .delete(`/carts`, {
            headers: { authorization: `Bearer ${token}` },
          })
          .then((res) => console.log(res));
        navigate(`/paymentsuccess`);
      },
      theme: {
        color: "#3397cc",
      },
    };

    const paymentObj = new window.Razorpay(options);
    paymentObj.open();
  };

  // const handleOrder = async () => {
  //   let orderId = localStorage.getItem("orderId");
  //   let arr = data.map((e) => {
  //     return { product_id: e.product_id, quantity: e.quantity };
  //   });
  //   if (!orderId) {
  //     const res = await axios.post(
  //       `http://localhost:2345/orders`,
  //       {
  //         products: arr,
  //         total,
  //         subtotal,
  //         discount,
  //         promoCode,
  //         address,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${token}` },
  //       }
  //     );
  //     localStorage.setItem("orderId", res.data._id);
  //   } else {
  //     const res = await axios.patch(
  //       `http://localhost:2345/orders/${orderId}`,
  //       {
  //         products: arr,
  //         total,
  //         subtotal,
  //         discount,
  //         promoCode,
  //         address,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${token}` },
  //       }
  //     );
  //   }
  //   navigate("/payment");
  // };
  return (
    <Flex
      direction={["column", "column", "row"]}
      justifyContent="center"
      margin="auto"
      gap="50px"
      //   border="1px solid"
      //   borderColor="black"
    >
      <Box>
        <Heading size="s">Order Summary</Heading>
        <Flex
          direction="column"
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
              justify="flex-start"
              border="1px solid"
              borderColor="black"
              key={i}
            >
              <Image src={e.product_id.image} h="100px" w="100px" />
              <Box margin="auto">
                {/* <Text>{e.product_id.title.slice(0, 35)}...</Text> */}
                <Text>{e.product_id.title}</Text>
                <Text>Quantity: {e.quantity}</Text>
                <Text>Price: {e.product_id.price}</Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>
      <Box
        border="1px solid"
        borderColor="black"
        h="fit-content"
        marginTop="25px"
      >
        <Button
          backgroundColor="teal.300"
          color="white"
          margin="10px 0"
          onClick={handleOrder}
        >
          Proceed to Payment
        </Button>
        <Divider />
        <Box position="relative">
          <Heading marginLeft="0" size="small">
            Delivery Address
          </Heading>
          <Text
            position="absolute"
            top="2px"
            right="2px"
            textDecoration="underline"
            color="teal.300"
            onClick={() => navigate("/checkout")}
          >
            change
          </Text>
          <Text>{address.name}</Text>
          <Text>{address.address_line_1}</Text>
          <Text>{address.address_line_2}</Text>
          <Text>
            {address.city} {address.state} {address.pincode}
          </Text>
        </Box>
        <Divider />
        <OrderTotal />
      </Box>
    </Flex>
  );
}
