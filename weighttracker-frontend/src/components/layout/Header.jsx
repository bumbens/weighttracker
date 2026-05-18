import styles from "../css/Header.module.css"

function Header({user}) {
    if (!user) return

    const logout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    return (
        <div>
            <h1>Hello {user.name}</h1>
            <h3>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            <button className={styles.logoutButton} onClick={logout}>Logout</button>
        </div>
    )
}

export default Header