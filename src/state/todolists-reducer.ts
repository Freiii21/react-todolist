import {Dispatch} from 'redux';
import {v1} from 'uuid';
import {todolistApi, TodolistType} from '../api/todolist-api';
import {AppRootStateType} from './store';
import {RequestStatusType, setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from '../app/app-reducer';
import {addTaskAC} from './tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

const initialState: Array<TodolistDomainType> = [];

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListFilter | SetTodosAT
    | SetAppStatusAT | SetAppErrorAT | ChangeTodoListEntityAT;

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            return [{
                ...action.todolist,
                filter: 'all',
                entityStatus: 'idle'
            }, ...state];
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(t => t.id === action.id ? {...t, entityStatus: action.entityStatus} : t)
        case 'SET_TODOS':
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
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
export type ChangeTodoListEntityAT = {
    type: 'CHANGE-TODOLIST-ENTITY-STATUS'
    id: string
    entityStatus: RequestStatusType
};

export const removeTodoListAC = (id: string): RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: id}
};
export const addTodoListAC = (todolist: TodolistType): AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodoListAC = (id: string, title: string): ChangeTodoListAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title};
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilter => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter};
}
export const setTodosAC = (todolists: Array<TodolistType>): SetTodosAT => {
    return {
        type: 'SET_TODOS',
        todolists
    }
}
export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType):ChangeTodoListEntityAT => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus};
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
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(addTodoListAC(res.data.data.item));
                } else {
                    dispatch(setAppStatusAC('failed'))
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                }
            })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTodoListEntityStatusAC(todolistId, 'loading'))
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                if(res.data.resultCode === 0){
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(removeTodoListAC(todolistId))
                } else {
                    dispatch(setAppStatusAC('failed'))
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC(res.data.messages[0]))
                    } else {
                        dispatch(setAppErrorAC('Some error occurred'))
                    }
                }

            })
    }
}
//

