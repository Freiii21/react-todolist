import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType} from '../../api/todolist-api';
import {handleserverAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginTC = createAsyncThunk("auth/login", async (param:LoginParamsType, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.login(param);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleserverAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsError});
        }
    } catch(error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({errors: [error], fieldsError: undefined});
    }
})
export const logoutTC = createAsyncThunk("auth/logout",async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.logout();
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return;
        } else {
            handleserverAppError(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({})
        }
    } catch(error:any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
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
        builder.addCase(loginTC.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC} = slice.actions;


