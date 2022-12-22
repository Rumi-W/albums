import axios from 'axios'

export const axiosMusic = axios.create({
    baseURL: 'https://itunes.apple.com/us/rss/topalbums/limit=100/json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})

export const axiosToDoList = axios.create({
    baseURL: 'https://app-todos-7e91c-default-rtdb.firebaseio.com/tasks.json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
})
