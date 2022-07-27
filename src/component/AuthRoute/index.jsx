import useGlobalState from "Hooks/useGlobalState";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute({ children }) {
  const [email] = useGlobalState("email");
  const location = useLocation();
  if (!email && !localStorage.getItem("email"))
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}
