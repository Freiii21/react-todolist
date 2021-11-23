import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
    //BLL:
    const todolistID_1 = v1();
    const todolistID_2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistID_1, title: 'What to learn', filter: 'all'},
        {id: todolistID_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistID_1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todolistID_2]: [
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Beer', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Bread', isDone: false},
        ],
    })


    const removeTask = (taskID: string, todolistID: string) => {
        tasks[todolistID] = tasks[todolistID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const addTask = (title: string, todolistID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title, //the same as title,
            isDone: false,
        }
        setTasks({
            ...tasks,
            [todolistID]: [newTask, ...tasks[todolistID]]
        })
    }
    const changeTaskStatus = (taskID: string, isDone: boolean, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        });
    }
    const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, title: title} : t)
        });
    }
    const changeFilter = (filter: FilterValuesType, todolistID: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, filter: filter} : t))
    }
    const changeTodolistTitle = (title: string, todolistID: string) => {
        setTodolists(todolists.map(t => t.id === todolistID ? {...t, title: title} : t))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
        delete tasks[todolistID]
    }
    const addTodolist = (title: string) => {
        const todolistID = v1()
        const newTodolist: TodolistType = {
            id: todolistID,
            title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistID]: []})
    }

    //UI (User Interface)
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
            {/*<div style={{marginLeft:"30px",marginTop:"30px"}}>*/}
            {/*    <AddItemForm addItem={addTodolist}/>*/}
            {/*</div>*/}
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

export default App;
