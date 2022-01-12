import React, {useEffect, useState} from 'react'
import {todolistApi} from '../api/todolist-api';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY" : "419c229b-43d4-438c-9dc1-973ee316752b"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(response => setState(response.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const title = "React";
    useEffect(() => {
        todolistApi.createTodolist(title)
            .then(response =>setState(response.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'ff5055f3-acf8-4297-b9f2-66a6931d8a02';
    useEffect(() => {
        todolistApi.deleteTodolist(todolistId)
            .then(response=>setState(response.data))
            .catch(error => setState(error.message))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const title = "Vue";
    const todolistId = '488d1331-786f-4c2f-a67c-19c5aad93e8f';
    useEffect(() => {
        todolistApi.updateTodolist ({todolistId, title})
            .then(response=>setState(response.data))
            .catch(error => setState(error.message))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
