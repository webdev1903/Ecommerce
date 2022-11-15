import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContextProvider";
import { Navigate, useLocation } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { state } = useContext(AuthContext);
  const pathname = useLocation();

  if (state.authStatus === false) {
    return <Navigate to="/login" state={{ from: pathname }} replace />;
  }
  return children;
}
