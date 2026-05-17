import { useState, useEffect } from "react";
import { getUsers } from "../services/api";

function useUser(refresh) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUsers()
            .then(data => setUser(data[0]))
    }, [refresh])

    return user
}

export default useUser