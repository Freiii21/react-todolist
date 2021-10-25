import React, {useState, ChangeEvent, KeyboardEvent} from 'react';
import {FilterValuesType, TaskType} from './App';
import s from './TodoList.module.css'

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const tasksJSXElements = props.tasks.map(task => {
        const removeTask = () => props.removeTask(task.id);
        return (
            <li key={task.id} >
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    })
    const addTask = () => {
        if(title){                  // string with any value true and empty string is false
            props.addTask(title)
            setTitle("")
        }
    };
    const bufferText = (event: ChangeEvent<HTMLInputElement>) => setTitle(event.currentTarget.value);
    const addTaskUsingEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            addTask()
        }
    }
    const filterAll = () => props.changeFilter("All")
    const filterActive = () => props.changeFilter("Active")
    const filterComplete = () => props.changeFilter("Completed")

    return(
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input
                    value={ title}
                    placeholder="Enter your task..."
                    onChange={bufferText}
                    onKeyPress={addTaskUsingEnter}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={filterAll}>All</button>
                <button onClick={filterActive}>Active</button>
                <button onClick={filterComplete}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;