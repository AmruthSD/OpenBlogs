import useAuthStore from "../../zustand/authStore";
import { redirect , Navigate } from "react-router-dom";

export default function ProtectedRoute({ children}) {
  const isAuth = useAuthStore((state) => state.isAuth);
  return  isAuth ? children : <Navigate to="/login" />;
}