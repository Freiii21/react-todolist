import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        }
        const changeTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }
        return (
            <ListItem
                disableGutters
                className={task.isDone ? 'is-Done' : ''}
                divider
                key={task.id}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px"
                }}
            >
                <Checkbox
                    color={"primary"}
                    onChange={changeStatus}
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} setNewTitle={changeTitle}/>
                <IconButton onClick={removeTask}>
                    <Delete fontSize={'small'}/>
                </IconButton>
            </ListItem>
        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    };

    const filterAll = () => props.changeFilter('all', props.id)
    const filterActive = () => props.changeFilter('active', props.id)
    const filterComplete = () => props.changeFilter('completed', props.id)
    const changeTodoListTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div className="todoList">
            <Typography variant={'h6'} align={"center"} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask}/>
            <List>
                {tasksJSXElements}
            </List>
            <div>
                <ButtonGroup
                    variant={'contained'}
                    size={'small'}
                >
                    <Button
                        color={props.filter === 'all' ? 'secondary' : 'primary'}
                        onClick={filterAll}>All
                    </Button>
                    <Button
                        color={props.filter === 'active' ? 'secondary' : 'primary'}
                        onClick={filterActive}>Active
                    </Button>
                    <Button
                        color={props.filter === 'completed' ? 'secondary' : 'primary'}
                        onClick={filterComplete}>Completed
                    </Button>
                </ButtonGroup>
            </div>
        </div>
    );
}

export default TodoList;