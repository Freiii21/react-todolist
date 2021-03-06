import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from './components/AddItemForm';
import {EditableSpan} from './components/EditableSpan';
import {Button, ButtonGroup, IconButton, List, Typography} from '@material-ui/core';
import {Delete} from '@material-ui/icons';
import {Task} from './Task';
import {FilterValuesType} from './state/todolists-reducer';
import {TaskStatuses, TaskType} from './api/todolist-api';
import {fetchTasksTC} from './state/tasks-reducer';
import {useDispatch} from 'react-redux';
import {RequestStatusType} from './app/app-reducer';

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    entityStatus: RequestStatusType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todolistID: string) => void
    changeFilter: (filter: FilterValuesType, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (taskID: string, status: TaskStatuses, todolistID: string) => void
    removeTodolist: (todolistID: string) => void
    changeTaskTitle: (taskID: string, title: string, todolistID: string) => void
    changeTodolistTitle: (title: string, todolistID: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    let tasksForRender: Array<TaskType> = props.tasks;
    if (props.filter === 'active') {
        tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForRender = tasksForRender.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasksJSXElements = tasksForRender.map(task => {
        return (
           <Task key={task.id}
                 todolistId={props.id}
                 task={task}
                 removeTask={props.removeTask}
                 changeTaskStatus={props.changeTaskStatus}
                 changeTaskTitle={props.changeTaskTitle}/>
        )
    })
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.addTask, props.id]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterAll = useCallback(() => props.changeFilter('all', props.id), [props.id])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterActive = useCallback(() => props.changeFilter('active', props.id), [props.id])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const filterComplete = useCallback(() => props.changeFilter('completed', props.id), [props.id])

    const changeTodoListTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return (
        <div className="todoList">
            <Typography variant={'h6'} align={"center"} style={{fontWeight: 'bold'}}>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <IconButton onClick={() => props.removeTodolist(props.id)} disabled={props.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </Typography>
            <AddItemForm addItem={addTask} entityStatus={props.entityStatus}/>
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