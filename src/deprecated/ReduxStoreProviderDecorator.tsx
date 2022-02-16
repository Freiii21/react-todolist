import React from 'react';
// import {Provider} from 'react-redux';
// import {AppRootStateType, store } from './store';
// import {combineReducers, createStore} from 'redux';
// import {tasksReducer} from './tasks-reducer';
// import {todolistsReducer} from './todolists-reducer';
// import {TaskPriorities, TaskStatuses} from '../api/todolist-api';
// import {RequestStatusType} from '../app/app-reducer';
//
// const rootReducer = combineReducers({
//     tasks: tasksReducer,
//     todolists: todolistsReducer
// })
//
// const initialGlobalState: AppRootStateType = {
//     todolists: [
//         {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0},
//         {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0}
//     ] ,
//     tasks: {
//         ["todolistId1"]: [
//             {id: '1', title: "HTML&CSS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
//             {id: '2', title: "JS", status: TaskStatuses.New, todoListId: "todolistId1", startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
//         ],
//         ["todolistId2"]: [
//             {id: '3', title: "Milk", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false},
//             {id: '4', title: "React Book", status: TaskStatuses.New, todoListId: "todolistId2", startDate: '',
//                 deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: false}
//         ]
//     },
//     app: {
//         status: 'loading' as RequestStatusType
//     }
// };
//
// export const storyBookStore = createStore(rootReducer, initialGlobalState);
//
// export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
//     return <Provider store={storyBookStore}>{storyFn()}</Provider>
// }