import { useState } from "react";
import { registerUser } from "../../services/api";
import styles from "../css/Registration.module.css"

function RegisterUser({ onRegister }) {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [age, setAge] = useState("")
    const [height, setHeight] = useState("")
    const [startWeight, setStartWeight] = useState("")
    const [targetWeight, setTargetWeight] = useState("")
    const [startDate, setStartDate] = useState("")

    const handleRegister = () => {
        if (!name || !mail || !password || !age || !height || !startWeight || !targetWeight) {
            alert("Please fill in all fields")
            return
        }

        const date = new Date().toLocaleDateString('en-CA')
        registerUser({ name, mail, age, password, height, startWeight, targetWeight, startDate: date })
            .then(() => onRegister())
            .catch(err => alert("Registration failed"))
    }

    return (
        <div className={styles.container}>
            <h1>Register</h1>
            <label>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
            <label>Email</label>
            <input type="email" value={mail} onChange={e => setMail(e.target.value)} />
            <label>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label>Age</label>
            <input type="number" value={age} onChange={e => setAge(e.target.value)} />
            <label>Height</label>
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} />
            <label>Start Weight</label>
            <input type="number" value={startWeight} onChange={e => setStartWeight(e.target.value)} />
            <label>Target Weight</label>
            <input type="number" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} />
            <button onClick={handleRegister}>Register</button>
            
        </div>
    )

}

export default RegisterUser