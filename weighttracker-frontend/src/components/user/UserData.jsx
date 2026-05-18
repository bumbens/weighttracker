import styles from '../css/UserData.module.css'
import { updateUser } from "../../services/api"
import UpdateUser from "./UpdateUser"
import { useState } from 'react'
import "../css/App.css"

function UserData({ user, onRefresh }) {

    const [isOpen, setIsOpen] = useState(false)
    const [age, setAge] = useState(user?.age)
    const [height, setHeight] = useState(user?.height)
    const [startWeight, setStartWeight] = useState(user?.startWeight)
    const [targetWeight, setTargetWeight] = useState(user?.targetWeight)
    const [startDate, setStartDate] = useState(user?.startDate)
    
    if (!user) return null


    const handleUpdate = () => {
        updateUser(user.id.toString(), { age, height, startWeight, targetWeight, startDate })
            .then(() => {
                setIsOpen(false)
                onRefresh()
            })
    }

    return (
        <div className={styles.container} >
            <h2>Your data</h2>
            <table className={styles.table}>
                <tbody>
                    <tr >
                        <td>Age</td>
                        <td>Height</td>
                        <td>Start weight</td>
                        <td>Target weight</td>
                        <td>Start date</td>
                    </tr>
                    <tr>
                        <td>{user.age}</td>
                        <td>{user.height}</td>
                        <td>{user.startWeight}</td>
                        <td>{user.targetWeight}</td>
                        <td>{user.startDate}</td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.updateButton} onClick={() => setIsOpen(true)} >Update data</button>
            <UpdateUser isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>Update User Data</h2>
                <p>Edit your information below:</p>
                <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                <input type="text" value={height} onChange={e => setHeight(e.target.value)} />
                <input type="text" value={startWeight} onChange={e => setStartWeight(e.target.value)} />
                <input type="text" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} />
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <button onClick={handleUpdate}>Save</button>
                <button onClick={() => setIsOpen(false)}>Close</button>
            </UpdateUser>
        </div>
    )
}

export default UserData