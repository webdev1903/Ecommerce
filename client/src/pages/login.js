import { useState, useContext } from "react";
import { FormLabel, Input, Button, Text, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { AuthStatus, Error, User, Token } from "../context/AuthContext/action";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { CartContext } from "../context/CartContext/CartContextProvider";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // const {handleCartCount} = useContext(CartContext)
  // if (state.authStatus) {
  //   if (location.state.from) navigate(location.state.from, { replace: true });
  //   else navigate("/");
  // }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    try {
      // console.log(data);
      const res = await axios.post(`/login`, data);
      dispatch({ type: AuthStatus });
      dispatch({ type: Token, payload: res.data.token });
      dispatch({ type: User, payload: res.data.user });
      // if (!location.state.from) navigate("/");
      // console.log("from", location.state.from);
      // else if (location.state.from) {
      //   navigate(location.state.from, { replace: true });
      // } else return navigate("/");
      return navigate("/");
      // return <Navigate to={location.state.from || "/"} />;
      // dispatch({})
      //   console.log(res);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  return (
    <Box>
      <form mb="50px">
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          name="email"
          placeholder="avasarala@some.com"
          value={data.email}
          onChange={handleChange}
        ></Input>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          name="password"
          placeholder="if you remember"
          onChange={handleChange}
          value={data.password}
        ></Input>
        <Button onClick={handleLogin}>Login</Button>
      </form>
      <Text>New to E-commerce</Text>
      <Link to="/signup">
        <Button>Create your E-commerce account</Button>
      </Link>
    </Box>
  );
}
