import styles from '../css/UserData.module.css'
import { updateUser, updatePreferences, getMeasurementTypes } from "../../services/api"
import Modal from "./Modal"
import { useState, useEffect } from 'react'
import useUserPreferences from '../../hooks/useUserPreferences'
import useMeasurementTypes from '../../hooks/useMeasurementTypes'
import "../css/App.css"

function UserData({ user, onRefresh, refresh }) {

    const [isUserUpdateOpen, setisUserUpdateOpen] = useState(false)
    const [isMeasurementsPreferencesOpen, setisMeasurementsPreferencesOpen] = useState(false)
    const { preferences, isLoading: prefsLoading } = useUserPreferences(user?.id)
    const { measurementTypes, isLoading: mtLoading } = useMeasurementTypes()
    const [selected, setSelected] = useState(preferences.map(pref => pref.measurementType.id))
    const [age, setAge] = useState(user?.age)
    const [height, setHeight] = useState(user?.height)
    const [startWeight, setStartWeight] = useState(user?.startWeight)
    const [targetWeight, setTargetWeight] = useState(user?.targetWeight)
    const [startDate, setStartDate] = useState(user?.startDate)

    useEffect(() => {
        if (preferences.length > 0) {
            setSelected(preferences.map(p => p.measurementType.id))
        }
    }, [preferences])




    if (!user) return null


    const handleUpdate = () => {
        updateUser(user.id.toString(), { age, height, startWeight, targetWeight, startDate })
            .then(() => {
                setisUserUpdateOpen(false)
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

            <button className="greenButton" onClick={() => setisUserUpdateOpen(true)} >Update data</button>

            <Modal isOpen={isUserUpdateOpen} onClose={() => setisUserUpdateOpen(false)}>
                <h2>Update User Data</h2>
                <p>Edit your information below:</p>
                <label>Your age</label>
                <input type="text" value={age} onChange={e => setAge(e.target.value)} />
                <label>Your height</label>
                <input type="text" value={height} onChange={e => setHeight(e.target.value)} />
                <label>Start weight</label>
                <input type="text" value={startWeight} onChange={e => setStartWeight(e.target.value)} />
                <label>Target weight</label>
                <input type="text" value={targetWeight} onChange={e => setTargetWeight(e.target.value)} />
                <label>Start date</label>
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <button className="greenButton" onClick={handleUpdate}>Save</button>
                <button className="redButton" onClick={() => setisUserUpdateOpen(false)}>Close</button>
            </Modal>

            <button className="greenButton" onClick={() => setisMeasurementsPreferencesOpen(true)} >Update measurements preferences</button>
            <Modal isOpen={isMeasurementsPreferencesOpen} onClose={() => setisMeasurementsPreferencesOpen(false)}>
                <p style={{ fontSize: '1rem', alignItems: 'center' }}>Here you can choose which measurements you want to track.</p>
                <div className={styles.container}>
                    {measurementTypes.map(mt => (
                        <div key={mt.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <label className={styles.name}>{mt.name}</label>
                            <input
                                className={styles.checkbox}
                                type="checkbox"
                                checked={selected.includes(mt.id)}
                                onChange={() => {
                                    if (selected.includes(mt.id)) {
                                        setSelected(selected.filter(id => id !== mt.id))
                                    } else {
                                        setSelected([...selected, mt.id])
                                    }
                                }}
                            />
                        </div>
                    ))}
                </div>
                <button className="greenButton" onClick={() =>
                    updatePreferences(user.id, selected.map(id => ({
                        user: { id: user.id },
                        measurementType: { id: id }
                    })))
                        .then(() => {
                            setisMeasurementsPreferencesOpen(false)
                            onRefresh()
                        })
                }>Save</button>
                <button className="redButton" onClick={() => setisMeasurementsPreferencesOpen(false)}>Close</button>

            </Modal>
        </div>
    )
}

export default UserData
