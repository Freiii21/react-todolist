import {TaskPriorities, TaskStatuses, TaskType, todolistApi, UpdateTaskModelType} from '../api/todolist-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppStatusAC} from '../app/app-reducer';
import {TasksStateType} from '../app/AppWithRedux';
import {AxiosError} from 'axios';
import {handleserverAppError, handleServerNetworkError} from '../utils/error-utils';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodoListAC, removeTodoListAC, setTodosAC} from './todolists-reducer';

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
    const res = await todolistApi.deleteTask(param.todoId, param.taskId);
    thunkAPI.dispatch(setAppStatusAC({status:'succeeded'}))
    return {taskId:param.taskId, todolistId:param.todoId};
})

export const addTaskTC = (title: string, todoId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status:'loading'}))
        todolistApi.createTask({title: title, todolistId: todoId})
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(addTaskAC(res.data.data.item))
                } else {
                    handleserverAppError<{item: TaskType}>(dispatch, res.data)
                }
            })
            .catch((err: AxiosError) => {
                    handleServerNetworkError(dispatch, err.message)
                }
            )
    }
}
export const updateTaskTC = (todoId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todoId].find(t => t.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title: task.title,
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                ...domainModel
            }
            todolistApi.updateTask(todoId, taskId, model)
                .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(updateTaskAC({taskId:taskId, domainModel:domainModel, todolistId:todoId}))
                    }
                })
        }
    }
}

const slice = createSlice({
        name: 'tasks',
        initialState: initialState,
        reducers: {
            addTaskAC: (state, action: PayloadAction<TaskType>) => {
                state[action.payload.todoListId].unshift(action.payload);
            },
            updateTaskAC: (state, action: PayloadAction<{ taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string }>) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex(t => t.id === action.payload.taskId);
                if (index > -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            },
        },
        extraReducers: (builder)=>{
            builder.addCase(addTodoListAC, (state, action)=>{
                state[action.payload.todolist.id] = [];
            });
            builder.addCase(removeTodoListAC, (state, action)=>{
                delete state[action.payload.id];
            });
            builder.addCase(setTodosAC, (state, action)=>{
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
        }
    }
)

export const tasksReducer = slice.reducer;
export const {addTaskAC,updateTaskAC} = slice.actions;

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
