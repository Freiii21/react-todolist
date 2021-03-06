import {addTaskTC, fetchTasksTC, removeTaskTC, tasksReducer, updateTaskTC} from './tasks-reducer';
import {addTodolistTC, fetchTodoslistsTC, removeTodolistTC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolist-api';

type TasksStateType = {
    [key: string]: Array<TaskType>
}

let startState: TasksStateType;


beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS",  status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "2", title: "JS",status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: '',
        deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
        deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
        ],
            "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskTC.fulfilled({taskId:"2", todolistId:"todolistId2"}, "", {taskId:"2", todoId:"todolistId2"});
    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS",  status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "2", title: "JS",status: TaskStatuses.Completed, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
                deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
        ]
    });

});
test('correct task should be added to correct array', () => {
    let task = {
        todoListId: 'todolistId2',
        title:'juce',
        status:TaskStatuses.New,
        addedDate:"",
        deadline:"",
        description:"",
        order:0,
        priority:0,
        startDate:"",
        id:"id exists",
        completed:false
    };
    const action = addTaskTC.fulfilled(task, "", {title:task.title, todoId: task.todoListId});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juce');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})
test('status of specified task should be changed', () => {
    const action = updateTaskTC.fulfilled({taskId:'2', domainModel: {status:TaskStatuses.New}, todolistId:'todolistId2'},
        "",{taskId:'2',domainModel: {status:TaskStatuses.New}, todoId:'todolistId2'});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});
test('title of specified task should be changed', () => {
    const action = updateTaskTC.fulfilled({taskId:'2', domainModel:{title:'newTitle'}, todolistId:'todolistId2'},
        "", {taskId:'2', domainModel:{title:'newTitle'}, todoId:'todolistId2'});
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe('newTitle');
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new array should be added when new todolist is added', () => {
    let todolist = {
        id: "blabla",
        title: "new todolist",
        addedDate: "",
        order: 0};
    const action = addTodolistTC.fulfilled({todolist: todolist},"",todolist.title);
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {
    const action = removeTodolistTC.fulfilled({id:'todolistId2'},"",'todolistId2');
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays sgould be added when we set todolists', () => {
    const action = fetchTodoslistsTC.fulfilled({todolists: [
            {id: "1", title: "title 1", addedDate: "", order: 0},
            {id: "2", title: "title 2", addedDate: "", order: 0},
        ]}, "")
    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState["1"]).toBeDefined();
    expect(endState["2"]).toBeDefined();
});

test('tasks should be added for todolist', () => {
    const action = fetchTasksTC.fulfilled({tasks:startState['todolistId1'], todoId:"todolistId1"}, "", "todolistId1")
    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": [],
    }, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
