import React from 'react';
import {FilterValuesType, TaskType} from './App';

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: number) => void
    changeFilter: (filter: FilterValuesType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const tasksJSXElements = props.tasks.map(task => {
        return (
            <li key={task.id}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={ () => props.removeTask(task.id)}>x</button>
            </li>
        )
    })
    return(
        <div className="todoList">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {tasksJSXElements}
            </ul>
            <div>
                <button onClick={ () => props.changeFilter("All")}>All</button>
                <button onClick={ () => props.changeFilter("Active")}>Active</button>
                <button onClick={ () => props.changeFilter("Completed")}>Completed</button>
            </div>
        </div>
    );
}

export default TodoList;