import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

//AT - action type
export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    todolistId: string
    title: string
}
type ChangeTodoListAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListAT | ChangeTodoListFilter;

export const todolistsReducer = (todolists:Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todolists.filter(t => t.id !== action.id);
        case 'ADD-TODOLIST':
            const newTodolist: TodolistType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all',
            }
            return [...todolists, newTodolist];
        case 'CHANGE-TODOLIST-TITLE':
            return todolists.map(t => t.id === action.id ? {...t, title: action.title} : t);
        case 'CHANGE-TODOLIST-FILTER':
            return todolists.map(t => t.id === action.id ? {...t, filter: action.filter} : t)
        default:
            return todolists;
    }
}

//AC - action creator
export const RemoveTodoListAC = (id: string):RemoveTodoListAT => {
    return {type: 'REMOVE-TODOLIST', id: id}
};
export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {type: 'ADD-TODOLIST', todolistId: v1(),title}
}
export const ChangeTodoListAC = (id: string, title: string):ChangeTodoListAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title};
}
export const ChangeTodoListFilterAC = (id: string, filter: FilterValuesType):ChangeTodoListFilter => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter};
}
