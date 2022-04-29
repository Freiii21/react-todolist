import {Dispatch} from 'redux';
import {todolistApi, TodolistType} from '../api/todolist-api';
import {AppRootStateType} from './store';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {AxiosError} from 'axios';
import {handleserverAppError, handleServerNetworkError} from '../utils/error-utils';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};
const initialState: Array<TodolistDomainType> = [];

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        removeTodoListAC:(state,action: PayloadAction<{id: string}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        addTodoListAC:(state,action: PayloadAction<{todolist: TodolistType}>) => {
            state.unshift({...action.payload.todolist, filter: 'all',entityStatus: 'idle'})
        },
        changeTodoListAC:(state,action: PayloadAction<{id: string, title: string}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].title = action.payload.title;
        },
        changeTodoListFilterAC:(state,action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        setTodosAC:(state,action: PayloadAction<{todolists: Array<TodolistType>}>) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        },
        changeTodoListEntityStatusAC:(state,action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus;
        },
    }
})

export const todolistsReducer = slice.reducer;
export const {removeTodoListAC, addTodoListAC, changeTodoListAC, changeTodoListFilterAC, setTodosAC,
    changeTodoListEntityStatusAC} = slice.actions;


export const fetchTodoslistsTC = () => (dispatch: Dispatch, getState: () => AppRootStateType): void => {
    dispatch(setAppStatusAC({status:'loading'}))
    todolistApi.getTodolists()
        .then((res) => {
            dispatch(setAppStatusAC({status:'succeeded'}))
            let todos = res.data;
            dispatch(setTodosAC({todolists:todos}));
        })
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType): void => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistApi.createTodolist(title)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(addTodoListAC({todolist:res.data.data.item}));
                } else {
                    handleserverAppError<{item: TodolistType}>(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
                    // dispatch(setAppErrorAC(err.message))
                    // dispatch(setAppStatusAC('failed'))
                }
            )
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTodoListEntityStatusAC({id:todolistId, entityStatus:'loading'}))
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
                if(res.data.resultCode === 0){
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(removeTodoListAC({id:todolistId}))
                } else {
                    dispatch(setAppStatusAC({status:'failed'}))
                    if (res.data.messages.length) {
                        dispatch(setAppErrorAC({error:res.data.messages[0]}))
                    } else {
                        dispatch(setAppErrorAC({error:'Some error occurred'}))
                    }
                }

            })
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.updateTodolist({todolistId:id, title:title})
            .then((res) => {
                dispatch(changeTodoListAC({id:id, title:title}))
            })
    }
}
