import React, {useCallback, useEffect, useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListAC,
    ChangeTodoListFilterAC, FilterValuesType,
    RemoveTodoListAC, setTodosAC, setTodosThunk, TodolistDomainType,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi} from './api/todolist-api';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    useEffect(() => {
        dispatch(setTodosThunk)
    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID,todolistID)
        dispatch(action)
    },[dispatch])
    const addTask = useCallback((title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New, todoListId: todolistID, startDate: '',
            deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false
        }
        let action = addTaskAC(title,todolistID)
        dispatch(action)
    },[dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        let action = changeTaskStatusAC(taskID,status,todolistID);
        dispatch(action);
    },[dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        let action = changeTaskTitleAC(taskID,title,todolistID);
        dispatch(action);
    },[dispatch])

    const changeFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        let action = ChangeTodoListFilterAC(todolistID,filter);
        dispatch(action);
    },[dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistID: string) => {
        let action = ChangeTodoListAC(todolistID,title);
        dispatch(action);
    },[dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        let action = RemoveTodoListAC(todolistID);
        dispatch(action);
    },[dispatch])
    const addTodolist = useCallback((title: string) => {
        let action = AddTodoListAC(title);
        dispatch(action);
    },[dispatch])

    const todolistsComponents = todolists.map(tl => {


        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeTaskStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
            </Grid>
        )
    })

    return (
        <div>
            <div className="App">
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todolists
                        </Typography>
                        <Button color="inherit" variant={'outlined'}>Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container style={{padding: '29px 0px'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={4}>
                        {todolistsComponents}
                    </Grid>
                </Container>
            </div>
        </div>
    );
}

export default AppWithRedux;
