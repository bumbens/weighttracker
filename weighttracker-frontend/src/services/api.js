const BASE_URL = 'https://weighttracker-production-5966.up.railway.app'

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

export const getUsers = () =>
    fetch(`${BASE_URL}/api/users`, { headers: authHeader() }).then(handleResponse)

export const registerUser = (data) => 
    fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(handleResponse)

export const getWeightEntries = () =>
    fetch(`${BASE_URL}/api/weightentry`, { headers: authHeader() }).then(handleResponse)

export const getWeightEntriesByUserId = (userId) =>
    fetch(`${BASE_URL}/api/weightentry/user/${userId}`, { headers: authHeader() }).then(handleResponse)

export const addWeightEntry = (data) =>
    fetch(`${BASE_URL}/api/weightentry/create`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)

export const deleteWeightEntry = (id) =>
    fetch(`${BASE_URL}/api/weightentry/delete/${id}`, {
        method: 'DELETE',
        headers: authHeader()
    }).then(resp => {
        if (resp.status == 401 || resp.status == 403) {
            localStorage.removeItem("token")
            window.location.reload()
        }
    }
    )

export const updateUser = (id, data) =>
    fetch(`${BASE_URL}/api/users/update/${id}`, {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(handleResponse)

export const login = (credentials) =>
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())

export const getCurrentUser = () =>
    fetch(`${BASE_URL}/api/users/me`, { headers: authHeader() }).then(handleResponse)