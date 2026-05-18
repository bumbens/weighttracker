import useWeightEntriesByUser from "../../hooks/useWeightEntriesByUser"
import { deleteWeightEntry } from "../../services/api"
import styles from '../css/ListMeasurements.module.css'

function ListMeasurements({ user, refresh, onRefresh }) {

    const entries = useWeightEntriesByUser(user.id, refresh)

    return (
        <div className={styles.container}>
            <h2>Your recent measurements</h2>
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
                    {entries.toReversed().slice(0, 5).map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.date}</td>
                            <td>{entry.weight} kg</td>
                            <td>{entry.waist} cm</td>
                            <td>{entry.chest} cm</td>
                            <td><button className={styles.deleteButton} onClick={() => {
                                deleteWeightEntry(entry.id)
                                    .then(() => onRefresh())
                            }}>Delete</button></td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>

    )
}

export default ListMeasurements