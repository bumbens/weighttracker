import { addWeightEntry } from "../../services/api"
import { useState } from "react"
import { updateUser } from "../../services/api"
import styles from "../css/AddMeasurement.module.css"
import "../css/App.css"

function AddMeasurement({ user, weightEntry, onRefresh }) {

    const [weight, setWeight] = useState("")
    const [waist, setWaist] = useState("")
    const [chest, setChest] = useState("")

    if (!weightEntry) return null



    const addMeasurement = () => {
        if (!weight || !waist || !chest) {
            alert("Please fill in all fields")
            return
        }
        
        const today = new Date().toLocaleDateString('en-CA')
        addWeightEntry({
            user: { id: user.id },
            date: today,
            weight: parseFloat(weight.replace(',', '.')),
            waist: parseFloat(waist.replace(',', '.')),
            chest: parseFloat(chest.replace(',', '.'))
        })
            .then(() => {
                setWeight("")
                setWaist("")
                setChest("")
                onRefresh()
            })

    }

    return (
        <div className={styles.container}>
            <h2>Add new measurement</h2>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td><label>Weight</label></td>
                        <td><label>Waist</label></td>
                        <td><label>Chest</label></td>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" value={weight} onChange={e => setWeight(e.target.value)}></input> kg</td>
                        <td><input type="text" value={waist} onChange={e => setWaist(e.target.value)}></input> cm</td>
                        <td><input type="text" value={chest} onChange={e => setChest(e.target.value)}></input> cm</td>
                    </tr>
                </tbody>
            </table>
            <button onClick={addMeasurement}>Add</button>
        </div>
    )
}

export default AddMeasurement