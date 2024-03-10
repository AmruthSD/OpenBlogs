import { useState } from "react";
import axios from "axios";
import useAuthStore from "../zustand/authStore";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import {Input} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import useLoadStateStore from "../zustand/loadStateStore";

export default function SignUp() {
  const router = useNavigate();
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  async function handleSignUp() {
    try {
      setIsLoading(true);
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/signup", {
        username: username,
        password: password,
      });
      const data = res.data;
      setAuthData(data.id, data.username, data.token);
      setIsAuth(true);
      Cookies.set("auth", JSON.stringify(data), { expires: 9 });
      router("/dashboard");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert("Invalid username or password");
    }
  }

  return (
    <div className=" w-80 mx-auto mt-36 flex flex-col gap-3 place-items-center">
      <h1 className=" text-4xl my-4">Sign Up</h1>
      <Input
        type="text"
        label="Username"
        value={username}
        variant="bordered"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="password"
        label="Password"
        value={password}
        variant="bordered"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        type="password"
        label="Confirm Password"
        value={confirmpassword}
        variant="bordered"
        onChange={(e) => setConfirmpassword(e.target.value)}
      />

      <Button color="primary" onClick={handleSignUp}>Sign Up</Button>
    </div>
  );
}
