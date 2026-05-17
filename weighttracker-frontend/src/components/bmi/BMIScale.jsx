import styles from '../css/BMI.module.css'

function BMIScale({ bmi }) {
    const category = () => {
        if (bmi < 18.5) return "Underweight"
        if (bmi < 25) return "Normal"
        if (bmi < 30) return "Overweight"
        return "Obesity"
    }

    const position = () => {
        const min = 15
        const max = 40
        const clamped = Math.min(Math.max(bmi, min), max)
        return (clamped - min) / (max - min) * 100
    }

    return (
        <div className={styles.container}>
            <p>Your BMI: {bmi} - {category()}</p>
            <div className={styles.scale}>
                <div className={styles.marker} style={{ left: `${position()}%` }} />
            </div>
            <div className={styles.values}>
                <span>15</span>
                <span>18.5</span>
                <span>25</span>
                <span>30</span>
                <span>40</span>
            </div>
        </div>
    )
}

export default BMIScale