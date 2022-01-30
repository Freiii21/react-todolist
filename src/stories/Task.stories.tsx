import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {AddItemForm} from '../AddItemForm';
import {action} from '@storybook/addon-actions';
import {Task} from '../Task';
import {TaskPriorities, TaskStatuses} from '../api/todolist-api';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'TODOLISTS/Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {
    task: {id: '1', title: 'JS', status: TaskStatuses.Completed, todoListId: '12345', startDate: '',
        deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
    todolistId: '12345'
};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    task: {id: '2', title: 'HTML',status: TaskStatuses.New, todoListId: '12345', startDate: '',
    deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low, description: '', completed: true},
    todolistId: '12345'
};

