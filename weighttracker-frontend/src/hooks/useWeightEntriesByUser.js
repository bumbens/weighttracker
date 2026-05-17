import { useEffect, useState } from "react";
import { getWeightEntriesByUserId } from "../services/api";

function useWeightEntriesByUser(userId, refresh) {
    const [entries, setEntries] = useState([])

    useEffect(() => {
        if (userId !== null) {
            getWeightEntriesByUserId(userId)
                .then(data => setEntries(data))
        }
    }, [userId, refresh])

    return entries
}

export default useWeightEntriesByUser