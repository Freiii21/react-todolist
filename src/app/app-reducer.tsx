import {authAPI} from '../api/todolist-api';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}
export const initializeAppTC = createAsyncThunk("app/initializeApp",async (param,thunkAPI) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
        thunkAPI.dispatch(setIsLoggedInAC({value: true}));
    }
    return;
})

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppErrorAC:(state,action: PayloadAction<{error: string | null}>) => {
            state.error = action.payload.error;
        },
        setAppStatusAC:(state,action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status;
        },
    },
    extraReducers: builder => {
        builder.addCase(initializeAppTC.fulfilled, (state)=>{
            state.isInitialized = true;
        })
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC} = slice.actions;
