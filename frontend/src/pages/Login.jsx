import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import useAuthStore from "../zustand/authStore";
import {Input} from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import useLoadStateStore from "../zustand/loadStateStore";

export default function Login() {
  const router = useNavigate();
  const setIsLoading = useLoadStateStore((state) => state.setIsLoading);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const setAuthData = useAuthStore((state) => state.setAuthData);
  const setIsAuth = useAuthStore((state) => state.setIsAuth);

  async function handleLogin() {
    try {
      setIsLoading(true);
      const res = await axios.post(import.meta.env.VITE_BACKEND_URL + '/users/login', {
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
      alert("Invalid username or password");
      setIsLoading(false);
    }
  }

  return (
    <div className=" w-80 mx-auto mt-36 flex flex-col gap-3 place-items-center">
      <h1 className=" text-4xl my-4">Login</h1>
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
      <Button color="primary" onClick={handleLogin}>Login</Button>
    </div>
  );
}
