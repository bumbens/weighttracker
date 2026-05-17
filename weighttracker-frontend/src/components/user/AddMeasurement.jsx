import { addWeightEntry } from "../../services/api"
import { useState } from "react"
import styles from "../css/AddMeasurement.module.css"

function AddMeasurement({ user, weightEntry, onRefresh }) {

    const [weight, setWeight] = useState("")
    const [waist, setWaist] = useState("")
    const [chest, setChest] = useState("")

    if (!weightEntry) return null


    const addMeasurement = () => {
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
            
                <label>Enter weight</label>
                <input type="text" value={weight} onChange={e => setWeight(e.target.value)}></input>
                <label>Enter waist</label>
                <input type="text" value={waist} onChange={e => setWaist(e.target.value)}></input>
                <label>Enter chest</label>
                <input type="text" value={chest} onChange={e => setChest(e.target.value)}></input>
                <button onClick={addMeasurement}>Add</button>
            
        </div>
    )
}

export default AddMeasurement