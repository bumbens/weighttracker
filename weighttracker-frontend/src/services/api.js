const BASE_URL = 'http://localhost:8080/api'

export const getUsers = () =>
    fetch(`${BASE_URL}/users`).then(resp => resp.json())

export const getWeightEntries = () =>
    fetch(`${BASE_URL}/weightentry`).then(resp => resp.json())

export const getWeightEntriesByUserId = (userId) =>
    fetch(`${BASE_URL}/weightentry/user/${userId}`).then(resp => resp.json())

export const addWeightEntry = (data) =>
    fetch(`${BASE_URL}/weightentry/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }).then(resp => resp.json())

export const deleteWeightEntry = (id) => 
    fetch(`${BASE_URL}/weightentry/delete/${id}`, {
        method: 'DELETE'
    })