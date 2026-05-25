import { useEffect, useState } from "react";
import { getMeasurementsByUserId } from "../services/api";

function useMeasurementsByUser(userId, refresh) {
    const [entries, setEntries] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {

        if (!userId) return;
        setIsLoading(true);

        getMeasurementsByUserId(userId)
            .then(data => {
                setEntries(data)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [userId, refresh])

    return { entries, isLoading }
}

export default useMeasurementsByUser