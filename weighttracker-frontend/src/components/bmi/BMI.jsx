import styles from '../css/BMI.module.css'
import BMIScale from './BMIScale'

function BMI({ user }) {
    const calculateBMI = () => {
        const heightM = user.height / 100
        return (user.currentWeight / (heightM ** 2)).toFixed(1)
    }

    return (
        <div>
            <BMIScale bmi={calculateBMI()} />
        </div>
    )

}

export default BMI