import styles from '../css/BMI.module.css'
import BMIScale from './BMIScale'

function BMI({ user, refresh }) {

    
    const calculateBMI = () => {
        const heightM = user.height / 100
        return (user.currentWeight / (heightM ** 2)).toFixed(1)
    }

    return (
        <div>
            <BMIScale bmi={calculateBMI()} user={user} refresh={refresh} />
        </div>
    )

}

export default BMI