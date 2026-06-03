import { useEffect, useState } from "react";
import { getMeasurementTypes } from "../services/api";

function useMeasurementTypes() {
    const [measurementTypes, setMeasurementTypes] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setIsLoading(true)
        getMeasurementTypes()
            .then(data => {
                setMeasurementTypes(data)
                setIsLoading(false)
            })
    }, [])

    return { measurementTypes, isLoading }
}

export default useMeasurementTypes