import {v1} from 'uuid';
import {
    addTodolistTC,
    changeTodoListEntityStatusAC,
    changeTodoListFilterAC, changeTodolistTitleTC, fetchTodoslistsTC, FilterValuesType, removeTodolistTC,
    TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {TodolistType} from '../api/todolist-api';
import {RequestStatusType} from '../app/app-reducer';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>;


beforeEach(() => {
        todolistId1 = v1();
        todolistId2 = v1();
        startState = [
            {id: todolistId1, title: 'What to learn', filter: 'all', entityStatus:'idle',addedDate: '', order: 0},
            {id: todolistId2, title: 'What to buy', filter: 'all', entityStatus:'idle',addedDate: '', order: 0}
        ]
    }
)


test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState,removeTodolistTC.fulfilled({id:todolistId1},"",todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolist: TodolistType = {
        title: 'New Todolist',
        id: "any id",
        addedDate: "",
        order: 0
    }
    const endState = todolistsReducer(startState, addTodolistTC.fulfilled({todolist},"",todolist.title))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New Todolist');
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = 'New Todolist';
    const endState = todolistsReducer(startState, changeTodolistTitleTC.fulfilled({id:todolistId2, title:newTodolistTitle},
        "",{id:todolistId2, title:newTodolistTitle}));

    expect(endState[0].title).toBe('What to learn');
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = 'completed';
    const endState = todolistsReducer(startState, changeTodoListFilterAC({id:todolistId2, filter:newFilter}));

    expect(endState[0].filter).toBe('all');
    expect(endState[1].filter).toBe(newFilter);
});

test('todolists should be added', () => {
    const action = fetchTodoslistsTC.fulfilled({todolists:startState}, "")
    const endState = todolistsReducer([],action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changed', () => {
    let newStatus: RequestStatusType = 'loading';

    const action = changeTodoListEntityStatusAC({id:todolistId2, entityStatus:newStatus})
    const endState = todolistsReducer(startState,action);

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
});