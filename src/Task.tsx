import React, {useState, ChangeEvent, KeyboardEvent, useCallback} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from './EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskType} from './App';

export type TaskPropsType ={
    task: TaskType
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {
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