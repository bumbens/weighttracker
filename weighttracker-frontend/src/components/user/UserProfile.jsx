import UserData from './UserData'

import BMI from '../bmi/BMI'
import { useState } from 'react'

import useWeightEntriesByUser from '../../hooks/useWeightEntriesByUser'

function UserProfile({ user, weightEntry, refresh, onRefresh }) {

    if (!user || !weightEntry) return null

    return (
        <div>
            <UserData user={user} onRefresh={onRefresh} refresh={refresh} />
        </div>
    )
}

export default UserProfile