const BASE_URL = import.meta.env.VITE_API_URL

const authHeader = () => {
    const token = localStorage.getItem("token")
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

const handleResponse = (resp) => {

    if (resp.status === 401 || resp.status === 403) {
        localStorage.removeItem("token")
        window.location.reload()
        return Promise.reject("Unauthorized")
    }
    return resp.json()

}


/* GET */

export const getUsers = () =>
    fetch(`${BASE_URL}/api/users`, { headers: authHeader() }).then(handleResponse)


export const getMeasurementsByUserId = (userId) =>
    fetch(`${BASE_URL}/measurements/${userId}`, { headers: authHeader() }).then(handleResponse)

export const getMeasurementTypes = () =>
    fetch(`${BASE_URL}/measurement-types`, {headers: authHeader()}).then(handleResponse)

export const getCurrentUser = () =>
    fetch(`${BASE_URL}/api/users/me`, { headers: authHeader() }).then(handleResponse)

export const getUserPreferences = (userId) =>
    fetch(`${BASE_URL}/preferences/${userId}`, {headers: authHeader() }).then(handleResponse)

/* POST */

export const login = (credentials) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())

export const savePreferences = (data) => 
    fetch(`${BASE_URL}/preferences`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)

export const registerUser = (data) => 
    fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(resp => resp.json())


export const addMeasurement = (data) => 
    fetch(`${BASE_URL}/measurements`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)


/* PUT */

export const updateUser = (id, data) =>
    fetch(`${BASE_URL}/api/users/update/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)

export const updatePreferences = (id, data) =>
    fetch(`${BASE_URL}/preferences/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)

/* DELETE */

export const deleteMeasurement = (id) =>
    fetch(`${BASE_URL}/measurements/delete/${id}`, {
        method: 'DELETE',
        headers: authHeader()
    }).then(resp => {
        if (resp.status == 401 || resp.status == 403) {
            localStorage.removeItem("token")
            window.location.reload()
        }
    }
    )


/* PATCH */

export const setPreferencesConfigured = (id) => 
    fetch(`${BASE_URL}/api/users/${id}/preferences-configured`, {
        method: 'PATCH',
        headers: authHeader(),
    }).then(handleResponse)