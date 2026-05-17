import { useState, useEffect } from "react";
import { getWeightEntries } from "../services/api";

function useWeightEntries() {
    const [ weightEntries, setWeightEntries ] = useState([])

    useEffect(() => {
        getWeightEntries()
            .then(data => setWeightEntries(data))
    }, [])

    return weightEntries
}

export default useWeightEntries