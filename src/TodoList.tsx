import React, {useState, ChangeEvent, KeyboardEvent, useCallback} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';

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

const TodoList = React.memo((props: TodoListPropsType) => {
    let tasksForRender: Array<TaskType> = props.tasks;
    if (props.filter === 'active') {
        tasksForRender = tasksForRender.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForRender = tasksForRender.filter(t => t.isDone === true)
    }

    const tasksJSXElements = tasksForRender.map(task => {
        return (
           <Task key={task.id}
                 task={task}
                 removeTask={props.removeTask}
                 changeStatus={props.changeTaskStatus}
                 changeTitle={props.changeTaskTitle}/>
        )
    })
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id]);

    const filterAll = useCallback(() => props.changeFilter('all', props.id), [props.id])
    const filterActive = useCallback(() => props.changeFilter('active', props.id), [props.id])
    const filterComplete = useCallback(() => props.changeFilter('completed', props.id), [props.id])

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
})

export default TodoList;