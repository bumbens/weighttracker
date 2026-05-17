import { useState } from "react";
import { login } from "../../services/api";

function Login({ onLogin }) {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = () => {
        login({ mail, password })
            .then(credentials => {
                console.log(credentials)
                localStorage.setItem("token", credentials.token)
                onLogin()
            })
            .catch(err => setError("Login failed"))
    }

    return (
        <div>
            <h1>Sign in</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Email</label>
            <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Sign in</button>

        </div>
    )
}

export default Login