import { useEffect, useState } from "react";
import { getMeasurementTypes } from "../services/api";

function useMeasurementTypes() {
    const [ measurementTypes, setMeasurementTypes ] = useState([])

    useEffect(() => {
        getMeasurementTypes()
            .then(data => setMeasurementTypes(data))
    }, [])

    return measurementTypes
}

export default useMeasurementTypes