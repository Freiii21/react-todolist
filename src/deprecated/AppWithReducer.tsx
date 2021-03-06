import React, {useReducer, useState} from 'react';
// import './App.css';
// import TodoList from './TodoList';
// import {v1} from 'uuid';
// import {AddItemForm} from './AddItemForm';
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
// import {Menu} from '@material-ui/icons';
// import {
//     AddTodoListAC, addTodolistTC,
//     ChangeTodoListAC,
//     ChangeTodoListFilterAC, FilterValuesType,
//     RemoveTodoListAC,
//     todolistsReducer
// } from './state/todolists-reducer';
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
// import {TaskPriorities, TaskStatuses, TaskType} from './api/todolist-api';
//
//
// type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function AppWithReducer() {
//     const todolistID_1 = v1();
//     const todolistID_2 = v1();
//
//     const [todolists, dispatchToTodolist] = useReducer(todolistsReducer,[
//         {id: todolistID_1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
//         {id: todolistID_2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
//     ])
//     const [tasks, dispatchToTasks] = useReducer(tasksReducer,{
//         [todolistID_1]: [
//             {id: v1(), title: 'HTML', status: TaskStatuses.Completed, todoListId: todolistID_1, startDate: '',
//         deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
//             {id: v1(), title: 'CSS', status: TaskStatuses.Completed, todoListId: todolistID_1, startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
//         ],
//         [todolistID_2]: [
//             {id: v1(), title: 'Meat', status: TaskStatuses.Completed, todoListId: todolistID_2, startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
//             {id: v1(), title: 'Beer', status: TaskStatuses.Completed, todoListId: todolistID_2, startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
//         ],
//     })
//
//     const removeTask = (taskID: string, todolistID: string) => {
//         let action = removeTaskAC(taskID,todolistID)
//         dispatchToTasks(action)
//     }
//     const addTask = (title: string, todolistID: string) => {
//         const newTask: TaskType = {
//             id: v1(),
//             title: title,
//             status: TaskStatuses.New, todoListId: todolistID, startDate: '',
//             deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false
//         }
//         let action = addTaskAC(newTask)
//         dispatchToTasks(action)
//     }
//     const changeTaskStatus = (taskID: string, status: TaskStatuses, todolistID: string) => {
//         let action = changeTaskStatusAC(taskID,status,todolistID);
//         dispatchToTasks(action);
//     }
//     const changeTaskTitle = (taskID: string, title: string, todolistID: string) => {
//         let action = changeTaskTitleAC(taskID,title,todolistID);
//         dispatchToTasks(action);
//     }
//
//     const changeFilter = (filter: FilterValuesType, todolistID: string) => {
//         let action = ChangeTodoListFilterAC(todolistID,filter);
//         dispatchToTodolist(action);
//     }
//     const changeTodolistTitle = (title: string, todolistID: string) => {
//         let action = ChangeTodoListAC(todolistID,title);
//         dispatchToTodolist(action);
//     }
//     const removeTodolist = (todolistID: string) => {
//         let action = RemoveTodoListAC(todolistID);
//         dispatchToTodolist(action);
//         dispatchToTasks(action);
//     }
//     const addTodolist = (title: string) => {
//         let action = addTodolistTC(title);
//         dispatchToTodolist(action);
//         dispatchToTasks(action);
//     }
//
//     const todolistsComponents = todolists.map(tl => {
//         let tasksForRender: Array<TaskType> = tasks[tl.id];
//         if (tl.filter === 'active') {
//             tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.New)
//         }
//         if (tl.filter === 'completed') {
//             tasksForRender = tasks[tl.id].filter(t => t.status === TaskStatuses.Completed)
//         }
//
//         return (
//             <Grid item key={tl.id}>
//                 <Paper elevation={8} style={{padding: '20px'}}>
//                     <TodoList
//                         id={tl.id}
//                         title={tl.title}
//                         filter={tl.filter}
//                         tasks={tasksForRender}
//                         removeTask={removeTask}
//                         changeFilter={changeFilter}
//                         addTask={addTask}
//                         changeTaskStatus={changeTaskStatus}
//                         removeTodolist={removeTodolist}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodolistTitle={changeTodolistTitle}
//                     />
//                 </Paper>
//             </Grid>
//         )
//     })
//
//     return (
//         <div>
//             <div className="App">
//                 <AppBar position="static">
//                     <Toolbar style={{justifyContent: 'space-between'}}>
//                         <IconButton edge="start" color="inherit" aria-label="menu">
//                             <Menu/>
//                         </IconButton>
//                         <Typography variant="h6">
//                             Todolists
//                         </Typography>
//                         <Button color="inherit" variant={'outlined'}>Login</Button>
//                     </Toolbar>
//                 </AppBar>
//                 <Container fixed>
//                     <Grid container style={{padding: '29px 0px'}}>
//                         <AddItemForm addItem={addTodolist}/>
//                     </Grid>
//                     <Grid container spacing={4}>
//                         {todolistsComponents}
//                     </Grid>
//                 </Container>
//             </div>
//         </div>
//     );
// }
//
// export default AppWithReducer;
