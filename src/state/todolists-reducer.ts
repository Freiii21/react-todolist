import {todolistApi, TodolistType} from '../api/todolist-api';
import {RequestStatusType, setAppErrorAC, setAppStatusAC} from '../app/app-reducer';
import {handleServerNetworkError} from '../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
};

export const fetchTodoslistsTC = createAsyncThunk("todolists/fetchTodolists",async (param, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await todolistApi.getTodolists();
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        let todos = res.data;
        return {todolists: todos};
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
    }
})
export const removeTodolistTC = createAsyncThunk("todolists/removeTodolist",async (todolistId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    thunkAPI.dispatch(changeTodoListEntityStatusAC({id: todolistId, entityStatus: 'loading'}))
    try {
        const res = await todolistApi.deleteTodolist(todolistId);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {id: todolistId}
            // thunkAPI.dispatch(removeTodoListAC({id: todolistId}))
        } else {
            thunkAPI.dispatch(setAppStatusAC({status: 'failed'}))
            if (res.data.messages.length) {
                thunkAPI.dispatch(setAppErrorAC({error: res.data.messages[0]}))
                return thunkAPI.rejectWithValue({})
            } else {
                thunkAPI.dispatch(setAppErrorAC({error: 'Some error occurred'}))
                return thunkAPI.rejectWithValue({})
            }
        }
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
    }
})
export const addTodolistTC = createAsyncThunk("todolists/addTodolist",async (title: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    try {
        const res = await todolistApi.createTodolist(title);
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return{todolist: res.data.data.item};
        } else {
            thunkAPI.dispatch(setAppErrorAC({error: 'Some error occurred'}))
            return thunkAPI.rejectWithValue({})
        }
    } catch( error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
    }
})
export const changeTodolistTitleTC = createAsyncThunk("todolists/changeTodolistTitle",
    async (param:{id: string, title: string}, thunkAPI) => {
    try {
        await todolistApi.updateTodolist({todolistId: param.id, title: param.title});
        return {id: param.id, title: param.title};
    } catch (error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
    }
    // thunkAPI.dispatch(changeTodoListAC({id:id, title:title}))
})

const slice = createSlice({
    name: "todolists",
    initialState: [] as Array<TodolistDomainType>,
    reducers: {
        // removeTodoListAC:(state,action: PayloadAction<{id: string}>) => {
        //     const index = state.findIndex(t => t.id === action.payload.id);
        //     if (index > -1) {
        //         state.splice(index, 1);
        //     }
        // },
        // addTodoListAC:(state,action: PayloadAction<{todolist: TodolistType}>) => {
        //     state.unshift({...action.payload.todolist, filter: 'all',entityStatus: 'idle'})
        // },
        // changeTodoListAC:(state,action: PayloadAction<{id: string, title: string}>) => {
        //     const index = state.findIndex(t => t.id === action.payload.id);
        //     state[index].title = action.payload.title;
        // },
        changeTodoListFilterAC:(state,action: PayloadAction<{id: string, filter: FilterValuesType}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].filter = action.payload.filter;
        },
        changeTodoListEntityStatusAC:(state,action: PayloadAction<{id: string, entityStatus: RequestStatusType}>) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].entityStatus = action.payload.entityStatus;
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoslistsTC.fulfilled, (state, action) => {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        })
        builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            if (index > -1) {
                state.splice(index, 1);
            }
        })
        builder.addCase(addTodolistTC.fulfilled, (state, action) => {
            state.unshift({...action.payload.todolist, filter: 'all',entityStatus: 'idle'})
        })
        builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
            const index = state.findIndex(t => t.id === action.payload.id);
            state[index].title = action.payload.title;
        })
    }
})

export const todolistsReducer = slice.reducer;
export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions;


