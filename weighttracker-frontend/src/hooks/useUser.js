import { useState, useEffect } from "react";
import { getCurrentUser } from "../services/api";

function useUser(refresh) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getCurrentUser()
            .then(data => setUser(data))
    }, [refresh])

    return user
}

export default useUser