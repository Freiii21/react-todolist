import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY" : "419c229b-43d4-438c-9dc1-973ee316752b"
    }
})

export const todolistApi = {
    getTodolists(){
        return instance.get<Array<TodoType>>('todo-lists')
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodoType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(params: {todolistId: string, title: string}){
        return instance.put<ResponseType>(`todo-lists/${params.todolistId}`, {title: params.title})
    },
}

type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type ResponseType<T = {}> = {
    fieldsError: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}