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
    const todolistId = '488d1331-786f-4c2f-a67c-19c5aad93e8f';
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

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'b59bb4df-ccc7-4984-b7e5-07542a3df57d';
    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then(response => setState(response.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}
export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = 'b59bb4df-ccc7-4984-b7e5-07542a3df57d';
    const title = "New Task";
    useEffect(() => {
        todolistApi.createTask({title, todolistId})
            .then(response =>setState(response.data))
    }, [])
    return <div> {JSON.stringify(state)}</div>
}