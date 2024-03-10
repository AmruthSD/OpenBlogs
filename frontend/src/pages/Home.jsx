import useAuthStore from "../zustand/authStore";

export default function Home() {
  const isAuth = useAuthStore((state) => state.isAuth);
  return (
    <div>
      <h1>Home</h1>
      {isAuth ? <h2>Welcome to the home page</h2> : <h2>You are not logged in</h2>}
    </div>
  );
}
