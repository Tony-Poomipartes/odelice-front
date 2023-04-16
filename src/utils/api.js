import axios from "axios"

export const removeToken = function () {
    return localStorage.removeItem('token')
}

export const setToken = function (token) {
    return localStorage.setItem('token', token)
}

export const getToken = function () {
    return localStorage.getItem('token')
}


export const getAPI = function () {
    const token = getToken()
    const headers = {}

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return axios.create({
        baseURL: 'https://odelicesback-development.up.railway.app/api',
        headers
    })
}
