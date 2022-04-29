import {authAPI} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {setIsLoggedInAC} from '../features/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'succeeded' as RequestStatusType,
    error: null as string | null,
    isInitialized: false
}

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
        setIsInitializedAC:(state,action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized;
        },
    }
})

export const appReducer = slice.reducer;
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions;

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}));
            } else {
            }
        })
        .finally(() => {
            dispatch(setIsInitializedAC({isInitialized: true}))
        })
}