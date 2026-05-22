import BMI from "../bmi/BMI"
import RecentMeasurements from "../user/RecentMeasurements"

function Home({user, weightEntry, refresh, onRefresh}) {

    if(!user || !weightEntry) return null

    return (
        <div>
            <BMI user = {user} weightEntry = {weightEntry} refresh={refresh} />
            <RecentMeasurements user={user} weightEntry={weightEntry} refresh={refresh} onRefresh={onRefresh} />
        </div>
    )
}

export default Home