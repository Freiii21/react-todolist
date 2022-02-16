import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {todolistApi, TodolistType} from '../api/todolist-api';
import {AppRootStateType} from './store';
import {setAppStatusAC, SetAppStatusAT} from '../app/app-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = [];

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListFilter | SetTodosAT
    | SetAppStatusAT;

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                ...action.todolist,
                filter: 'all'
            }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'SET_TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all'}))
        default:
            return state;
    }
}

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
}
type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}
export type SetTodosAT = {
    type: 'SET_TODOS'
    todolists: Array<TodolistType>
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: id}
};
export const AddTodoListAC = (todolist: TodolistType): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const ChangeTodoListAC = (id: string, title: string): ChangeTodoListAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title};
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter};
}
export const setTodosAC = (todolists: Array<TodolistType>): SetTodosAT => {
    return {
        type: 'SET_TODOS',
        todolists
    }
}


export const fetchTodoslistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC('loading'))
    todolistApi.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC('succeeded'))
            let todos = res.data;
            dispatch(setTodosAC(todos));
        })
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType): void => {
        dispatch(setAppStatusAC('loading'))
        todolistApi.createTodolist(title)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(AddTodoListAC(res.data.data.item));
            })
    }
    }

