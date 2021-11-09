import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';

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
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)
    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id, props.id);
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
            props.addTask(trimmedTitle, props.id)
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

    const filterAll = () => props.changeFilter('all', props.id)
    const filterActive = () => props.changeFilter('active', props.id)
    const filterComplete = () => props.changeFilter('completed', props.id)

    const allBtnClass = props.filter === 'all' ? 'active-filter' : '';
    const activeBtnClass = props.filter === 'active' ? 'active-filter' : '';
    const completedBtnClass = props.filter === 'completed' ? 'active-filter' : '';
    const errorMessage = error ? <div style={{color: "red"}}>Title is required</div> : null;

    return (
        <div className="todoList">
            <h3>
                {props.title}
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h3>
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