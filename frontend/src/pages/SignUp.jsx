export default function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSignUp() {
        console.log('jello');
    }

    return (
        <div>
        <h1>Sign Up</h1>
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
        <button onClick={handleSignUp}>Sign Up</button>
        {error && <p>{error}</p>}
        </div>
    );
    }