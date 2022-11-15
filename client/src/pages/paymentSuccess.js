import { Image, Box, Heading, Text } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  const id = useRef(null);
  useEffect(() => {
    id.current = setInterval(() => {
      setTimer((prev) => prev - 1);
      if (timer <= 0) {
        clearInterval(id.current);
        navigate("/");
      }
    }, 1000);
  }, []);
  if (timer <= 0) {
    clearInterval(id.current);
    navigate("/");
  }
  return (
    <Box m="auto">
      <Image src="./payment_successful.gif" m="auto" />
      <Heading color="green">Payment Successfull.</Heading>
      <Text>You will be redirected to the home page in {timer} seconds...</Text>
    </Box>
  );
}
