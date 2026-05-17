const BASE_URL = 'http://localhost:8080'

const authHeader = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("token")}`
})

export const getUsers = () =>
    fetch(`${BASE_URL}/api/users`, { headers: authHeader() }).then(resp => resp.json())

export const getWeightEntries = () =>
    fetch(`${BASE_URL}/api/weightentry`, { headers: authHeader() }).then(resp => resp.json())

export const getWeightEntriesByUserId = (userId) =>
    fetch(`${BASE_URL}/api/weightentry/user/${userId}`, { headers: authHeader() }).then(resp => resp.json())

export const addWeightEntry = (data) =>
    fetch(`${BASE_URL}/api/weightentry/create`, {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    }).then(resp => resp.json())

export const deleteWeightEntry = (id) => 
    fetch(`${BASE_URL}/api/weightentry/delete/${id}`, {
        method: 'DELETE',
        headers: authHeader()
    })

export const login = (credentials) => 
    fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
    }).then(resp => resp.json())

export const getCurrentUser = () =>
    fetch(`${BASE_URL}/api/users/me`, { headers: authHeader() }).then(resp => resp.json())