import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

export type TaskType = {
    id: number
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

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID))
        // return undefined;  --it`s default value.
    }

    let [filter, setFilter] = useState<FilterValuesType>("All");


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
                title={'What to learn'}
                tasks={tasksForRender}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
            {/*            <TodoList title={"What to buy"}/>
            <TodoList title={"What to read"}/>*/}
        </div>
    );
}

export default App;
