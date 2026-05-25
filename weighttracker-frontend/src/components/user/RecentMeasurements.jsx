import useMeasurementsByUser from "../../hooks/useMeasurementsByUser"
import useUserPreferences from '../../hooks/useUserPreferences'
import styles from '../css/ListMeasurements.module.css'

function RecentMeasurements({ user, measurements, refresh, onRefresh }) {

    const {preferences, isLoading: prefsLoading} = useUserPreferences(user?.id)
    const {entries, isLoading} = useMeasurementsByUser(user?.id, refresh)

    if (!user) return null


    const grouped = entries.reduce((acc, entry) => {
        const date = entry.date
        if (!acc[date]) acc[date] = {}
        acc[date][entry.measurementType.id] = entry
        return acc
    }, {})

    return (
        <div className={styles.container}>
            <h2>Your recent measurements</h2>

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
                    {isLoading ||prefsLoading ? null : Object.entries(grouped).slice(-5).map(([date, measurements]) => (
                        <tr key={date}>
                            <td>{date}</td>
                                {preferences.map(pref => (
                                    <td key={pref.measurementType.id}>
                                        {measurements[pref.measurementType.id]?.value}
                                    </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default RecentMeasurements