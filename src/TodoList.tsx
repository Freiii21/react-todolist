import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

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
            <li className={task.isDone ? 'is-Done' : ''}
                key={task.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <EditableSpan title={task.title} setNewTitle={changeTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
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

    const allBtnClass = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : '';
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : '';

    return (
        <div className="todoList">
            <h3>
                <EditableSpan title={props.title} setNewTitle={changeTodoListTitle}/>
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button
                    className={allBtnClass}
                    onClick={filterAll}>All
                </button>
                <button
                    className={activeBtnClass}
                    onClick={filterActive}>Active
                </button>
                <button
                    className={completedBtnClass}
                    onClick={filterComplete}>Completed
                </button>
            </div>
        </div>
    );
}

export default TodoList;