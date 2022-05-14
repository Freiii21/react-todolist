import axios, {AxiosResponse} from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY" : "419c229b-43d4-438c-9dc1-973ee316752b"
    }
})

export const todolistApi = {
    getTodolists(){
        return instance.get<Array<TodolistType>>('todo-lists')
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(params: {todolistId: string, title: string}){
        return instance.put<ResponseType>(`todo-lists/${params.todolistId}`, {title: params.title})
    },
    getTasks(todolistId: string){
        return instance.get<ResponseTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(params: {title: string, todolistId: string}){
        return instance.post<ResponseType<{item: TaskType}>>(`todo-lists/${params.todolistId}/tasks`, {title: params.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

export const authAPI = {
    login(data:LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId: number }>>>("auth/login", data)
    },
    me(){
        return instance.get<ResponseType<{ dat: ResponseMeType }>>("/auth/me")
    },
    logout(){
        return instance.delete<ResponseType>("auth/login")
    }

}

type ResponseMeType = {
    id: number
    email: string
    login: string
}

export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
    capcha?: string
}

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type ResponseType<T = {}> = {
    fieldsError?: Array<{field: string, error: string}>
    messages: Array<string>
    resultCode: number
    data: T
}

export enum TaskStatuses {
   New ,
   InProgress,
   Completed,
   Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

type ResponseTaskType = {
    error: string
    totalCount: number
    items: TaskType[]
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}