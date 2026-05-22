import { useState } from "react"
import useWeightEntriesByUser from "../../hooks/useWeightEntriesByUser"
import { addWeightEntry, deleteWeightEntry } from "../../services/api"
import styles from '../css/ListMeasurements.module.css'
import Modal from './Modal'

function AllMeasurements({ user, weightEntry, refresh, onRefresh }) {

    const { entries, isLoading } = useWeightEntriesByUser(user.id, refresh)
    const [weight, setWeight] = useState("")
    const [waist, setWaist] = useState("")
    const [chest, setChest] = useState("")
    const [isOpen, setIsOpen] = useState(false)

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
                setIsOpen(false)
                onRefresh()
            })
    }
    return (
        <div className={styles.container}>
            <h2>Your measurements</h2>
            <button className="greenButton" onClick={() => setIsOpen(true)}>Add new measurement</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

                <h2>Add new measurement</h2>
                <label>Weight</label>
                <input type="text" value={weight} onChange={e => setWeight(e.target.value)} />
                <label>Waist</label>
                <input type="text" value={waist} onChange={e => setWaist(e.target.value)} />
                <label>Chest</label>
                <input type="text" value={chest} onChange={e => setChest(e.target.value)} />
                <button className="greenButton" onClick={addMeasurement}>Add</button>
                <button className="redButton" onClick={() => setIsOpen(false)}>Close</button>

            </Modal>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Date</td>
                        <td>Weight</td>
                        <td>Waist</td>
                        <td>Chest</td>
                    </tr>
                </thead>
                <tbody>
                    {isLoading ? null : (
                        entries.toReversed().map(entry => (
                            <tr key={entry.id}>
                                <td>{entry.date}</td>
                                <td>{entry.weight} kg</td>
                                <td>{entry.waist} cm</td>
                                <td>{entry.chest} cm</td>
                                <td><button className="redButton" onClick={() => {
                                    deleteWeightEntry(entry.id)
                                        .then(() => onRefresh())
                                }}>Delete</button></td>
                            </tr>
                        )))}

                </tbody>
            </table>


        </div>

    )
}

export default AllMeasurements