import styles from '../css/BMI.module.css'
import BMIScale from './BMIScale'
import useWeightEntriesByUser from '../../hooks/useWeightEntriesByUser'

function BMI({ user, refresh }) {

    
    const weightEntries = useWeightEntriesByUser(user.id)
    const calculateBMI = () => {
        const heightM = user.height / 100
        return (user.currentWeight / (heightM ** 2)).toFixed(1)
    }

    return (
        <div>
            <BMIScale bmi={calculateBMI()} user={user} entries={weightEntries} refresh={refresh} />
        </div>
    )

}

export default BMI