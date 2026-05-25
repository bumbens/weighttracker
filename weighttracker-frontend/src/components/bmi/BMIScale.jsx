import styles from '../css/BMI.module.css'

function BMIScale({ bmi, user, refresh }) {


    const weightLost = () => {
        
        return (user.startWeight - user.currentWeight).toFixed(1)
    }

    const isLoss = weightLost() > 0

    const category = () => {
        if (bmi < 18.5) return "Underweight"
        if (bmi < 25) return "Normal"
        if (bmi < 30) return "Overweight"
        return "Obesity"
    }

    const position = () => {
        const min = 15
        const max = 50
        const clamped = Math.min(Math.max(bmi, min), max)
        return (clamped - min) / (max - min) * 100
    }

    return (
        <div className={styles.container}>
            <p>Your BMI: {bmi} - {category()}</p>
            <div className={styles.scale}>
                <div className={styles.marker} style={{ left: `${position()}%` }} />
            </div>
            <div style={{ position: 'relative', width: '100%', height: '20px' }}>
                {[15, 18.5, 25, 30, 40, 50].map(val => (
                    <span key={val} style={{
                        position: 'absolute',
                        left: `${(val - 15) / (50 - 15) * 100}%`,
                        transform: 'translateX(-50%)'
                    }}>
                        {val}
                    </span>
                ))}


            </div>
                <p style={{ color: isLoss ? 'green' : 'red' }}>
                    {isLoss ? `Great job! You've lost ${weightLost()} kg so far!` : "Keep going, you can do it!"}
                </p>
        </div>
    )
}

export default BMIScale