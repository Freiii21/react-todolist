import React, {useCallback, useEffect} from 'react';
import './App.css';
import TodoList from '../TodoList';
import {AddItemForm} from '../components/AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodolistTC,
    changeTodoListFilterAC, changeTodolistTitleTC,
    fetchTodoslistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from '../state/todolists-reducer';
import {addTaskTC, removeTaskTC, updateTaskTC} from '../state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {TaskStatuses, TaskType} from '../api/todolist-api';
import LinearProgress from '@mui/material/LinearProgress';
import {initializeAppTC, RequestStatusType} from './app-reducer';
import {ErrorSnackbar} from '../components/ErrorSnackbar';
import {Login} from '../features/Login/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import {logoutTC} from '../features/Login/auth-reducer';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    useEffect(() => {
        dispatch(initializeAppTC())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized)
    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    useEffect(() => {
        if(!isLoggedIn){
            return;
        }
        dispatch(fetchTodoslistsTC())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoggedIn])

    const removeTask = useCallback((taskID: string, todolistID: string) => {
        let action = removeTaskTC({taskId:taskID, todoId:todolistID})
        dispatch(action)
    }, [dispatch])
    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskTC({title, todoId:todolistID}))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskID: string, status: TaskStatuses, todolistID: string) => {
        //let action = changeTaskStatusAC(taskID,status,todolistID);
        dispatch(updateTaskTC({todoId:todolistID, taskId:taskID, domainModel:{status: status}}));
    }, [dispatch])
    const changeTaskTitle = useCallback((taskID: string, title: string, todolistID: string) => {
        let action = updateTaskTC({todoId:todolistID, taskId:taskID, domainModel:{title: title}});
        dispatch(action);
    }, [dispatch])


    const changeFilter = useCallback((filter: FilterValuesType, todolistID: string) => {
        let action = changeTodoListFilterAC({id:todolistID, filter:filter});
        dispatch(action);
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todolistID: string) => {
        let action = changeTodolistTitleTC({id:todolistID, title});
        dispatch(action);
    }, [dispatch])
    const removeTodolist = useCallback((todolistID: string) => {
        let action = removeTodolistTC(todolistID);
        dispatch(action);
    }, [dispatch])
    const addTodolist = useCallback((title: string) => {
        let action = addTodolistTC(title);
        dispatch(action);
    }, [dispatch])


    const logoutHandler = () => {
        dispatch(logoutTC())
    }

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    const todolistsComponents = todolists.map(tl => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={8} style={{padding: '20px'}}>
                    <TodoList
                        id={tl.id}
                        title={tl.title}
                        filter={tl.filter}
                        entityStatus={tl.entityStatus}
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
                        <IconButton edge="start" color="inherit" aria-label="menu" style={{width:"106px"}}>
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            Todolists
                        </Typography>
                        {isLoggedIn && <Button color="inherit" variant={'outlined'} onClick={logoutHandler}>Logout</Button>}
                        {!isLoggedIn && <div style={{width:"94px"}}/>}
                    </Toolbar>
                </AppBar>

                {status === 'loading' && <LinearProgress color="secondary"/>}

                <Container fixed>
                    <Routes>
                        <Route path="/" element={<TodolistsBlock addTodolist={addTodolist}
                                                            todolistsComponents={todolistsComponents}/>}
                        />
                        <Route path="login" element={<Login/>}/>
                        <Route path="404" element={<h1 style={{textAlign: 'center'}}>404 page not found</h1>}/>
                        <Route path="*" element={<Navigate to={"404"}/>}/>
                    </Routes>
                </Container>

                <ErrorSnackbar/>
            </div>
        </div>
    );
}

type TodolistsBlockPropsType = {
    addTodolist: (title: string) => void
    todolistsComponents: JSX.Element[]
}

const TodolistsBlock = (props:TodolistsBlockPropsType) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={"login"}/>
    }

    return (
        <>
            <Grid container style={{padding: '29px 0px'}}>
                <AddItemForm addItem={props.addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {props.todolistsComponents}
            </Grid>
        </>
    )
}

export default AppWithRedux;
