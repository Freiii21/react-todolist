import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    AddTodoListAC,
    ChangeTodoListAC,
    ChangeTodoListFilterAC,
    RemoveTodoListAC,
    todolistsReducer
} from './state/todolists-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}
export type FilterValuesType = 'all' | 'active' | 'completed';

function AppWithRedux() {
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    const removeTask = (taskID: string, todolistID: string) => {
        let action = removeTaskAC(taskID,todolistID)
        dispatch(action)
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false,
        }
        let action = addTaskAC(title,todolistID)
        dispatch(action)
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        let action = changeTaskStatusAC(taskID,isDone,todolistID);
        dispatch(action);
    }
    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        let action = changeTaskTitleAC(taskID,title,todolistID);
        dispatch(action);
    }

    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        let action = ChangeTodoListFilterAC(todolistID,filter);
        dispatch(action);
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        let action = ChangeTodoListAC(todolistID,title);
        dispatch(action);
    }
    const removeTodolist = (todolistID: string) => {
        let action = RemoveTodoListAC(todolistID);
        dispatch(action);
    }
    const addTodolist = (title: string) => {
        let action = AddTodoListAC(title);
        dispatch(action);
    }

    const todolistsComponents = todolists.map(tl => {
        let tasksForRender: Array<TaskType> = tasks[tl.id];
        if (tl.filter === 'active') {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === 'completed') {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        tasks={tasksForRender}
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
