import { Dispatch } from 'redux'
import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {handleserverAppError, handleServerNetworkError} from '../../utils/error-utils';
import {AxiosError} from 'axios';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginTC = createAsyncThunk("auth/login", async (param:LoginParamsType, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.login(param);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true}
        } else {
            handleserverAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsError});
        }
    } catch(error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error], fieldsError: undefined});
    }
})

const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value;
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;


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
