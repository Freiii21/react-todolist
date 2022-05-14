import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from '../api/todolist-api';
import {AppRootStateType} from './store';
import {setAppStatusAC} from '../app/app-reducer';
import {TasksStateType} from '../app/AppWithRedux';
import {handleserverAppError, handleServerNetworkError} from '../utils/error-utils';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addTodolistTC, fetchTodoslistsTC, removeTodolistTC} from './todolists-reducer';

const initialState: TasksStateType = {};

export const fetchTasksTC = createAsyncThunk("task/fetchTasks", async (todoId: string, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    const res = await todolistApi.getTasks(todoId);
    thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    let tasks = res.data.items;
    return {tasks:tasks, todoId:todoId};
})
export const removeTaskTC = createAsyncThunk("task/removeTask",async (param: {taskId: string, todoId: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status:'loading'}))
    await todolistApi.deleteTask(param.todoId, param.taskId);
    thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    return {taskId:param.taskId, todolistId:param.todoId};
})
export const addTaskTC = createAsyncThunk("task/addTask",async (param: {title: string, todoId: string}, thunkAPI) => {
    thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
    try {
        const res = await todolistApi.createTask({title: param.title, todolistId: param.todoId})
        if (res.data.resultCode === 0) {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return res.data.data.item;
        } else {
            handleserverAppError<{ item: TaskType }>(thunkAPI.dispatch, res.data)
            return thunkAPI.rejectWithValue({})
        }
    }catch(error: any) {
        handleServerNetworkError(thunkAPI.dispatch, error)
        return thunkAPI.rejectWithValue({})
    }
})
export const updateTaskTC = createAsyncThunk("task/updateTask",
    async (param:{todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType},thunkAPI) => {
        const state = thunkAPI.getState() as AppRootStateType;
        const task = state.tasks[param.todoId].find(t => t.id === param.taskId)
        if (!task){
            return thunkAPI.rejectWithValue({})
        }
        const model: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            ...param.domainModel
        }
        try {
            const res = await todolistApi.updateTask(param.todoId, param.taskId, model);
            if (res.data.resultCode === 0) {
                return {taskId: param.taskId, domainModel: param.domainModel, todolistId: param.todoId}
            } else {
                handleserverAppError(thunkAPI.dispatch, res.data)
                return thunkAPI.rejectWithValue({})
            }
        } catch (error: any){
            handleServerNetworkError(thunkAPI.dispatch, error)
            return thunkAPI.rejectWithValue({})
        }
})

const slice = createSlice({
        name: 'tasks',
        initialState: initialState,
        reducers: {
            // updateTaskAC: (state, action: PayloadAction<{ taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>) => {
            //     const tasks = state[action.payload.todolistId];
            //     const index = tasks.findIndex(t => t.id === action.payload.taskId);
            //     if (index > -1) {
            //         tasks[index] = {...tasks[index], ...action.payload.domainModel};
            //     }
            // },
        },
        extraReducers: (builder)=>{
            builder.addCase(addTodolistTC.fulfilled, (state, action)=>{
                state[action.payload.todolist.id] = [];
            });
            builder.addCase(removeTodolistTC.fulfilled, (state, action)=>{
                delete state[action.payload.id];
            });
            builder.addCase(fetchTodoslistsTC.fulfilled, (state, action)=>{
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                })
            });
            builder.addCase(fetchTasksTC.fulfilled, (state, action)=>{
                state[action.payload.todoId] = action.payload.tasks;
            });
            builder.addCase(removeTaskTC.fulfilled, (state, action)=>{
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks.splice(index, 1);
                }
            });
            builder.addCase(addTaskTC.fulfilled, (state, action)=>{
                state[action.payload.todoListId].unshift(action.payload);
            });
            builder.addCase(updateTaskTC.fulfilled, (state, action)=>{
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            });
        }
    }
)

export const tasksReducer = slice.reducer;
// export const {} = slice.actions;
// export const {updateTaskAC} = slice.actions;

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
