import {setAppStatusAC} from '../../app/app-reducer'
import {authAPI, LoginParamsType, securityAPI} from '../../api/todolist-api';
import {handleserverAppError, handleServerNetworkError} from '../../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const loginTC = createAsyncThunk("auth/login", async (param:LoginParamsType, thunkAPI)=>{
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await authAPI.login(param);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setCaptchaSuccessAC())
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {isLoggedIn: true};
        } else {
            if (res.data.resultCode === 10){
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                handleserverAppError(thunkAPI.dispatch, res.data)
                thunkAPI.dispatch(getCaptchaUrlTC());
                return {isLoggedIn: false};
            } else {
                handleserverAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue({errors: res.data.messages, fieldsError: res.data.fieldsError});
            }
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
export const getCaptchaUrlTC = createAsyncThunk("auth/getCaptchaUrl",async (param, thunkAPI) => {
    try {
        const res = await securityAPI.getCaptchaUrl();
        if (res.status === 200) {
            const captcha = res.data.url;
            return {captcha};
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
        isLoggedIn: false,
        captchaUrl: ""
    },
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value;
        },
        setCaptchaSuccessAC(state){
            state.captchaUrl = "";
        }
    },
    extraReducers: builder => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
        })
        builder.addCase(logoutTC.fulfilled, (state) => {
            state.isLoggedIn = false
        })
        builder.addCase(getCaptchaUrlTC.fulfilled, (state, action) => {
            state.captchaUrl = action.payload.captcha
        })
    }
})

export const authReducer = slice.reducer;
export const {setIsLoggedInAC, setCaptchaSuccessAC} = slice.actions;


