import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { getCartItems } from "../redux/cart/cart.actions";

export default function Cart() {
  const { state } = useContext(AuthContext);
  const { data } = useSelector((store) => store.cart);
  const cartDispatch = useDispatch();

  useEffect(() => {
    cartDispatch(getCartItems(state.token));
  }, []);

  return (
    <div>
      {data.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </div>
  );
}
