import {TasksStateType} from '../App';
import { v1 } from 'uuid';
import {AddTodoListAT, RemoveTodoListAT, SetTodosAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from '../api/todolist-api';
import {Dispatch} from 'redux';

const initialState: TasksStateType = {};

export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT
    | RemoveTodoListAT | SetTodosAT | SetTasksAT;

export const tasksReducer = (state:TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id != action.taskId)};
        case 'ADD-TASK':
            return {
                ...state,
                [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]};
        case 'CHANGE-TASK-STATUS':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, status:action.status} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t, title:action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            let newState = {...state};
            delete newState[action.id];
            return newState;
        case 'SET_TODOS':
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        case 'SET_TASKS':
            return {
                ...state,
                [action.todoId]: action.tasks
            }
        default:
            return state;
    }
}

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    task: TaskType
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    taskId: string
    status: TaskStatuses
    todolistId: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todolistId: string
}
type SetTasksAT = {
    type: 'SET_TASKS'
    tasks: TaskType[]
    todoId: string
}

export const removeTaskAC = (taskId: string, todolistId: string):RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (task: TaskType):AddTaskAT => {
    return {type: 'ADD-TASK', task}
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string):ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string):ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
};
export const setTasksAC = (tasks: TaskType[], todoId: string): SetTasksAT => {
    return {
        type: 'SET_TASKS',
        tasks,
        todoId
    }
}


//Thunk
export const setTasksThunk = (todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todoId)
            .then(res => {
                let tasks = res.data.items;
                dispatch(setTasksAC(tasks, todoId))
            })
    }
}
export const removeTaskThunk = (taskId: string, todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTask(todoId, taskId)
            .then(res => {
                if(res.data.resultCode === 0){
                    dispatch(removeTaskAC(taskId, todoId))
                }
            })
    }
}
export const addTaskThunk = (title: string, todoId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask({title:title,todolistId:todoId})
            .then(res => {
                if(res.data.resultCode === 0){
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))
                }
            })
    }
}