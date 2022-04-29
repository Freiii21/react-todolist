import { Dispatch } from 'redux';
import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import { ResponseType } from '../api/todolist-api';

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC({error:message}))
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleserverAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppStatusAC({status:'failed'}))
    if (data.messages.length) {
        dispatch(setAppErrorAC({error:data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error:'Some error occurred'}))
    }
}