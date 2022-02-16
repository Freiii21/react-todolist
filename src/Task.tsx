import React, {ChangeEvent} from 'react';
import {Checkbox, IconButton, ListItem} from '@material-ui/core';
import {EditableSpan} from './components/EditableSpan';
import {Delete} from '@material-ui/icons';
import {TaskStatuses, TaskType} from './api/todolist-api';


export type TaskPropsType ={
    task: TaskType
    todolistId:string
    removeTask: (taskID: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
}

export const Task = React.memo((props:TaskPropsType) => {
    const removeTask = () => props.removeTask(props.task.id, props.todolistId);
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked ?
            TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const changeTitle = (title: string) => {
        props.changeTaskTitle(props.task.id, title, props.todolistId)
    }

    return (
        <ListItem
            disableGutters
            className={props.task.status === TaskStatuses.Completed ? 'is-Done' : ''}
            divider
            key={props.task.id}
            style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0px"
            }}
        >
            <Checkbox
                color={"primary"}
                onChange={changeStatus}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan title={props.task.title} setNewTitle={changeTitle}/>
            <IconButton onClick={removeTask}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </ListItem>
    )
})