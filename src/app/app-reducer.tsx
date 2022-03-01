import {authAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export type SetAppStatusAT = {
    type: 'APP/SET-STATUS'
    status: RequestStatusType
}
export type SetAppErrorAT = {
    type: 'APP/SET-ERROR'
    error: string | null
}
export type SetIsInitializedAT = ReturnType<typeof setIsInitializedAC>
export const setAppStatusAC = (status: RequestStatusType): SetAppStatusAT => {
    return {
        type: 'APP/SET-STATUS',
        status
    }
}
export const setAppErrorAC = (error: string | null): SetAppErrorAT => {
    return {
        type: 'APP/SET-ERROR',
        error
    }
}
export const setIsInitializedAC = (isInitialized: boolean) => {
    return {
        type: 'INITIALIZED',
        isInitialized
    } as const
}

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true));
            } else {
            }
        })
        .finally(() => {
            dispatch(setIsInitializedAC(true))
        })
}


type AppActionsType = SetAppStatusAT | SetAppErrorAT | SetIsInitializedAT
