import { statusFilters } from './constants';
import { combineReducers } from 'redux';

const tasksInitialState = {
  tasks: [
    { id: 0, text: 'Learn HTML and CSS', completed: true },
    { id: 1, text: 'Get good at JavaScript', completed: true },
    { id: 2, text: 'Master React', completed: false },
    { id: 3, text: 'Discover Redux', completed: false },
    { id: 4, text: 'Build amazing apps', completed: false },
  ],
  filters: {
    status: statusFilters.all,
  },
};

const taskReduser = (state = tasksInitialState, action) => {
  // Редюсер розрізняє екшени за значенням властивості type
  switch (action.type) {
    // Залежно від типу екшену виконуватиметься різна логіка
    case 'tasks/addTask':
      return [...state, action.payload];
    case 'tasks/deleteTask':
      return state.filter(task => task.id !== action.payload);
    case 'tasks/toggleCompleted':
      return state.map(task => {
        if (task.id !== action.payload) {
          return task;
        }
        return { ...task, completed: !task.completed };
      });
    default:
      // Кожен редюсер отримує всі екшени, відправлені в стор.
      // Якщо редюсер не повинен обробляти якийсь тип екшену,
      // необхідно повернути наявний стан без змін.
      return state;
  }
};

const filterInitialState = {
  status: statusFilters.all,
};

const filterReduser = (state = filterInitialState, action) => {
  switch (action.type) {
    case 'filters/setStatusFilter':
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  tasks: taskReduser,
  filters: filterReduser,
});
