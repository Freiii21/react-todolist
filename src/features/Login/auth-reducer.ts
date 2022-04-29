import { Dispatch } from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {handleserverAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false
}

const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value;
        }
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;

export const loginTC = (data: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login(data)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(setIsLoggedInAC({value: true}))
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
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status:'succeeded'}))
                dispatch(setIsLoggedInAC({value: false}))
            } else {
                handleserverAppError(dispatch, res.data)
            }
        })
        .catch((err: AxiosError) => {
                handleServerNetworkError(dispatch, err.message)
            }
        )
}
