import { useEffect, useState } from "react"
import useMeasurementTypes from "../../hooks/useMeasurementTypes"
import { savePreferences, setPreferencesConfigured } from "../../services/api"
import styles from '../css/MeasurementPreferencesSetup.module.css'

function MeasurementPreferencesSetup({ user, onRefresh }) {

    const preferences = useMeasurementTypes(user?.id)
    const [selected, setSelected] = useState([])
    const [step, setStep] = useState(0)
    const [leaving, setLeaving] = useState(false)

    useEffect(() => {
        const t1 = setTimeout(() => setLeaving(true), 2000)
        const t2 = setTimeout(() => { setStep(1); setLeaving(false) }, 2800)
        const t3 = setTimeout(() => setLeaving(true), 5800)
        const t4 = setTimeout(() => { setStep(2); setLeaving(false) }, 6600)
        const t5 = setTimeout(() => setLeaving(true), 9600)
        const t6 = setTimeout(() => { setStep(3); setLeaving(false) }, 10400)

        return () => [t1, t2, t3, t4, t5, t6].forEach(clearTimeout)
    }, [])

    if (!user) return null

    return (
        <div className={styles.container}>
            {step === 0 && <h1 className={`${leaving ? styles.fadeOut : styles.fadeIn} ${styles.heading}`}>Hi {user.name}!</h1>}
            {step === 1 && <h1 className={`${leaving ? styles.fadeOut : styles.fadeIn} ${styles.heading}`}>Your journey starts here.</h1>}
            {step === 2 &&
                <>
                    <h1 className={`${leaving ? styles.fadeOut : styles.fadeIn} ${styles.heading}`}>Let's set things up.</h1>
                    <h2 className={`${leaving ? styles.fadeOut : styles.fadeIn} ${styles.heading}`}>What would you like to track?</h2>
                </>
            }            {step === 3 && <div className={leaving ? styles.fadeOut : styles.fadeIn}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td>Measurement</td>
                            <td>Track</td>
                        </tr>
                    </thead>
                    <tbody>
                        {preferences.map(entry => (
                            <tr key={entry.id}>
                                <td>{entry.name}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={selected.includes(entry.id)}
                                        onChange={() => {
                                            if (selected.includes(entry.id)) {
                                                setSelected(selected.filter(id => id !== entry.id))
                                            } else {
                                                setSelected([...selected, entry.id])
                                            }
                                        }}
                                    />
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={() =>
                    savePreferences(selected.map(id => ({ user: { id: user.id }, measurementType: { id: id } })))
                        .then(() => setPreferencesConfigured(user.id))
                        .then(() => onRefresh())
                }>Save</button>
            </div>}
        </div>
    )
}

export default MeasurementPreferencesSetup