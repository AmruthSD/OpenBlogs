export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleLogin() {
        console.log('jello');
    }

    return (
        <div>
        <h1>Login</h1>
        <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        {error && <p>{error}</p>}
        </div>
    );
    }