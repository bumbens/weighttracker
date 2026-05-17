import styles from '../css/UserData.module.css'

function UserData({ user }) {

    if (!user) return null

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
        </div>
    )
}

export default UserData