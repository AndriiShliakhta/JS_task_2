import { data } from './data';
import { v4 as uuidv4 } from 'uuid';
import template from '../tamplates/users/item.hbs';
import taskTemplate from '../tamplates/users/list.hbs';
import * as task from './taskForm';

export const refs = {
  userForm: document.forms.userForm,
  name: document.forms.userForm.elements.usersName,
  email: document.forms.userForm.elements.usersEmail,
  usersList: document.querySelector('.usersList'),
  tasksList: document.querySelector('.tasksList'),

  taskForm: document.forms.taskForm,
  taskPerformer: document.forms.taskForm.elements.taskPerformer,

};

const onHandleChange = e => {
  const { name, value } = e.target;
  data.users.user[name] = value;
};

const appendEmailToTaskPerformer = function () {
  const emailsArr = data.users.items.map(user => user.userEmail);
  refs.taskPerformer.innerHTML = taskTemplate(emailsArr);
}



const onHandleSubmit = e => {
  e.preventDefault();
  data.users.items = [...data.users.items, { ...data.users.user, id: uuidv4() }];
  data.users.user.userName = '';
  data.users.user.userEmail = '';
  refs.userForm.reset();
  refs.usersList.innerHTML = template(data.users.items);

  appendEmailToTaskPerformer();
};
const onHandleDelete = e => {
  if (e.target?.dataset?.button !== 'userDeleteButton') {
    return;
  }
  data.users.items = data.users.items.filter(user => user.id !== e.target.id);
  refs.usersList.innerHTML = template(data.users.items);

  appendEmailToTaskPerformer();
};

refs.userForm.addEventListener('input', onHandleChange);
refs.userForm.addEventListener('submit', onHandleSubmit);
refs.usersList.addEventListener('click', onHandleDelete);

refs.taskForm.addEventListener('input', task.onHandleChange);
refs.taskForm.addEventListener('submit', task.onHandleSubmit);
refs.tasksList.addEventListener('click', task.onHandleDelete);


