import { useState } from "react"
import useMeasurementsByUser from "../../hooks/useMeasurementsByUser"
import useUserPreferences from '../../hooks/useUserPreferences'
import { deleteMeasurement, addMeasurement as addMeasurementApi } from "../../services/api"
import styles from '../css/ListMeasurements.module.css'
import Modal from './Modal'

function AllMeasurements({ user, measurements, refresh, onRefresh }) {

    const { preferences, isLoading: prefsLoading } = useUserPreferences(user?.id)
    const { entries, isLoading } = useMeasurementsByUser(user?.id, refresh)
    const [values, setValues] = useState({})
    const [isOpen, setIsOpen] = useState(false)

    if (!user) return null


    const addMeasurement = () => {
        if (preferences.some(pref => !values[pref.measurementType.id])) {
            alert("Please fill in all fields")
            return
        }

        const today = new Date().toLocaleDateString('en-CA')

        Promise.all(
            preferences.map(pref =>
                addMeasurementApi({
                    user: { id: user.id },
                    measurementType: { id: pref.measurementType.id },
                    value: parseFloat(values[pref.measurementType.id].replace(',', '.')),
                    date: today
                })
            )
        )
            .then(() => {
                setValues({})
                setIsOpen(false)
                onRefresh()
            })
    }

    const grouped = entries.reduce((acc, entry) => {
        const date = entry.date
        if (!acc[date]) acc[date] = {}
        acc[date][entry.measurementType.id] = entry
        return acc
    }, {})


    return (
        <div className={styles.container}>
            <h2>Your measurements</h2>
            <button className="greenButton" onClick={() => setIsOpen(true)}>Add new measurement</button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <h2>Add new measurements</h2>
                {preferences.map(pref => (
                    <div key={pref.measurementType.id}>
                        <label>{pref.measurementType.name}</label>
                        <input
                            type="text"
                            value={values[pref.measurementType.id] || ""}
                            onChange={e => setValues({ ...values, [pref.measurementType.id]: e.target.value })} />
                    </div>
                ))}
                <button className="greenButton" onClick={addMeasurement}>Add</button>
                <button className="redButton" onClick={() => setIsOpen(false)}>Close</button>
            </Modal>
            {isLoading || prefsLoading || Object.keys(grouped).length === 0 ? null : (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            {preferences.map(pref => (
                                <th key={pref.measurementType.id}>{pref.measurementType.name}</th>
                            ))}
                        
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(grouped).map(([date, measurements]) => (
                            <tr key={date}>
                                <td>{date}</td>
                                {preferences.map(pref => (
                                    <td key={pref.measurementType.id}>
                                        {measurements[pref.measurementType.id]?.value}
                                    </td>
                                ))}
                                <td>
                                    <button className="redButton" onClick={() => {
                                        const ids = Object.values(measurements).map(m => m.id)
                                        Promise.all(ids.map(id => deleteMeasurement(id)))
                                            .then(() => onRefresh())
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div >
    )
}

export default AllMeasurements
