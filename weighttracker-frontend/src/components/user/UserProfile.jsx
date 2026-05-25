import UserData from './UserData'

import BMI from '../bmi/BMI'
import { useState } from 'react'

import useMeasurementsByUser from '../../hooks/useMeasurementsByUser'

function UserProfile({ user, measurements, refresh, onRefresh }) {

    if (!user || !measurements) return null

    return (
        <div>
            <UserData user={user} onRefresh={onRefresh} refresh={refresh} />
        </div>
    )
}

export default UserProfile