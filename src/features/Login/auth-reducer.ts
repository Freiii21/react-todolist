import { Dispatch } from 'redux'
import { SetAppErrorAT, setAppStatusAC, SetAppStatusAT } from '../../app/app-reducer'
import {authAPI, LoginParamsType, TaskType, todolistApi} from '../../api/todolist-api';
import {handleserverAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {addTaskAC} from '../../state/tasks-reducer';

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleserverAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            }
        )
}

export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
            } else {
                handleserverAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            }
        )
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetAppStatusAT | SetAppErrorAT
