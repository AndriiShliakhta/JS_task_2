import { data } from './data';
import { refs } from './userForm.js';
import taskListTemplate from '../tamplates/users/tasks.hbs';
import { v4 as uuidv4 } from 'uuid';

export const onHandleChange = e => {
    const { name, value} = e.target;
    data.users.task[name] = value;
};

export const onHandleSubmit = e => {
  e.preventDefault();
  data.users.taskItems = [...data.users.taskItems, { ...data.users.task, id: uuidv4() }];
  data.users.task.taskName = '';
  data.users.task.difficultyLevel = '';
  data.users.task.taskPerformer = '';
  refs.taskForm.reset();
  refs.tasksList.innerHTML = taskListTemplate(data.users.taskItems);
};

export const onHandleDelete = e => {
  if (e.target?.dataset?.btn !== 'taskDeleteButton') {
      return;
    }
  data.users.taskItems = data.users.taskItems.filter(task => task.id !== e.target.id);
  refs.tasksList.innerHTML = taskListTemplate(data.users.taskItems);
};

