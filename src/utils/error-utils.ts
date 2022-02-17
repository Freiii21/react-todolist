import { Dispatch } from 'redux';
import {setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import { ResponseType } from '../api/todolist-api';

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setAppErrorAC(message))
    dispatch(setAppStatusAC('failed'))
}

export const handleserverAppError = <T>(dispatch: Dispatch, data: ResponseType<T>) => {
    dispatch(setAppStatusAC('failed'))
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
}