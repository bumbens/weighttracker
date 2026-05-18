import { useState } from "react";
import { login } from "../../services/api";
import RegisterUser from "./RegisterUser";
import styles from "../css/LoginPage.module.css"
import "../css/LoginPage.module.css"
import logo from '../../assets/logo.png'

function Login({ onLogin }) {
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [showRegister, setShowRegister] = useState(false)

    const handleLogin = () => {
        if (!mail || !password) {
            setError("Please fill in all fields")
            return
        }
        
        login({ mail, password })
            .then(credentials => {
                localStorage.setItem("token", credentials.token)
                onLogin()
            })
            .catch(err => setError("Login failed"))
    }

    if (showRegister) {
        return <RegisterUser onRegister={() => setShowRegister(false)} />;
    }

    return (
        <div className={styles.container}>
            <img src={logo} alt="Logo" className={styles.logo} />

            <h1>Sign in</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label>Email</label>
            <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div className={styles.buttonContainer}>
            <button onClick={handleLogin}>Sign in</button>
            <button onClick={() => setShowRegister(true)}>Don't have an account? Register</button>
            </div>
        </div>
    )
}

export default Login