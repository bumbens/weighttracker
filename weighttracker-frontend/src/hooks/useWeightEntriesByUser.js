import { useEffect, useState } from "react";
import { getWeightEntriesByUserId } from "../services/api";

function useWeightEntriesByUser(userId, refresh) {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (!userId) return;
        setIsLoading(true);

        getWeightEntriesByUserId(userId)
            .then(data => {
                setEntries(data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [userId, refresh])

    return { entries, isLoading }
}

export default useWeightEntriesByUser