import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "All" | "Active" | "Completed";

function App() {
    // BLL (Business Logic Layer)
/*     let tasksForState: Array<TaskType> = [      // Array<TaskType>==TaskType []
         {id: 1, title: "HTML", isDone: true},
         {id: 2, title: "CSS", isDone: true},
         {id: 3, title: "React", isDone: false},
         {id: 4, title: "Redux", isDone: false},
     ];
    const [tasks, setTasks] = useState<Array<TaskType>>(tasksForState)*/

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML', isDone: true},
        {id: v1(), title: 'CSS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>("All");
    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        // return undefined;  --it`s default value.
    }
    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title, //the same as title,
            isDone: false,
        }
        setTasks([newTask,...tasks])
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t =>t.id === taskID ? {...t, isDone} : t));
    }

    //UI (User Interface)
    let tasksForRender = tasks;
    if(filter === "Active"){
        tasksForRender = tasks.filter(t => t.isDone === false)
    }
    if(filter === "Completed"){
        tasksForRender = tasks.filter(t => t.isDone === true)
    }

    const changeFilter = (filter: FilterValuesType) => {
      setFilter(filter)
    }
    return (
        <div className="App">
            <TodoList
                filter={filter}
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
            />
            {/*            <TodoList title={"What to buy"}/>
            <TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
