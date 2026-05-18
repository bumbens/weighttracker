import UserData from './UserData'
import AddMeasurement from './AddMeasurement'
import BMI from '../bmi/BMI'
import { useState } from 'react'
import ListMeasurements from './ListMeasurements'
import useWeightEntriesByUser from '../../hooks/useWeightEntriesByUser'

function UserProfile({ user, weightEntry, refresh, onRefresh }) {

    if (!user || !weightEntry) return null

    return (
        <div>
            <UserData user={user} onRefresh={onRefresh} refresh={refresh} />
            <BMI user={user} onRefresh={onRefresh} />
            <AddMeasurement user={user} weightEntry={weightEntry} onRefresh={onRefresh} />
            <ListMeasurements user={user} refresh={refresh} onRefresh={onRefresh} />
        </div>
    )
}

export default UserProfile