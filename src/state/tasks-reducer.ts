import {TasksStateType} from '../App';
import { v1 } from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    taskId: string
    todolistId: string
}
type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
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

const initialState: TasksStateType = {};

export type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT;

export const tasksReducer = (state:TasksStateType = initialState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(task => task.id != action.taskId)};
        case 'ADD-TASK':
            const newTask = {id: v1(), title: action.title, status: TaskStatuses.New, todoListId: action.todolistId, startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false};
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]};
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
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string):RemoveTaskAT => {
    return {type: 'REMOVE-TASK', taskId, todolistId}
};
export const addTaskAC = (title: string, todolistId: string):AddTaskAT => {
    return {type: 'ADD-TASK', title, todolistId}
};
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string):ChangeTaskStatusAT => {
    return {type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
};
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string):ChangeTaskTitleAT => {
    return {type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
};
