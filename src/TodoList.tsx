import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    filter: FilterValuesType
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked)
        }
        return (
            <li className={task.isDone ? 'is-Done' : ''}
                key={task.id}>
                <input
                    onChange={changeStatus}
                    type="checkbox"
                    checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {                  // string with any value true and empty string is false
            props.addTask(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle('')
    };
    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false);
    }
    const addTaskUsingEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask()
        }
    }
    const filterAll = () => props.changeFilter('All')
    const filterActive = () => props.changeFilter('Active')
    const filterComplete = () => props.changeFilter('Completed')

    const allBtnClass = props.filter === 'All' ? 'active-filter' : '';
    const activeBtnClass = props.filter === 'Active' ? 'active-filter' : '';
    const completedBtnClass = props.filter === 'Completed' ? 'active-filter' : '';
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null;

    return (
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    value={title}
                    placeholder="Enter your task..."
                    onChange={changeTitle}
                    onKeyPress={addTaskUsingEnter}
                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
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