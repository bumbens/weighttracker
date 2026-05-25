import BMI from "../bmi/BMI"
import RecentMeasurements from "../user/RecentMeasurements"

function Home({user, measurements, refresh, onRefresh}) {

    if(!user || !measurements) return null

    return (
        <div>
            <h1>Hello {user.name}</h1>
            <h3>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
            <BMI user = {user} refresh={refresh} />
            <RecentMeasurements user={user} measurements={measurements} refresh={refresh} onRefresh={onRefresh} />
        </div>
    )
}

export default Home