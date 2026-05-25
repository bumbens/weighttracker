import { useEffect, useState } from "react"
import { getUserPreferences } from "../services/api"

function useUserPreferences(userId) {
    const [userPreferences, setUserPreferences] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!userId) return
        setIsLoading(true)
        getUserPreferences(userId)
            .then(data => setUserPreferences(data))
            .finally(() => setIsLoading(false))
    }, [userId])

    return { preferences: userPreferences, isLoading }
}

export default useUserPreferences