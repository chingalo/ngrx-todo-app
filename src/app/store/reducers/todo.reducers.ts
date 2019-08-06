import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from 'src/app/models';
import { loadTodos, addTodos, deleteTodo } from '../aciions';

// state of todo
export interface TodoState {
  todos: Todo[];
  isLoaded: boolean;
  isLoading: boolean;
  error: string;
}

// initate initial state of todo
const initialState: TodoState = {
  todos: [],
  isLoaded: true,
  isLoading: false,
  error: null
};

// handling of states

const todoReducerFuction = createReducer(
  initialState,
  on(loadTodos, state => {
    // change state
    const newState = {
      ...state,
      isLoaded: false,
      isLoading: true,
      error: null
    };
    // return states
    return newState;
  }),
  on(addTodos, (state, { todos }) => {
    let currentIndex = state.todos.length;
    todos = todos.map((todo: Todo) => {
      currentIndex++;
      return {
        ...todo,
        id: `${currentIndex}`,
        title: `${todo.title} ${currentIndex}`,
        description: `${todo.description} ${currentIndex}`
      };
    });
    const newTodo = state.todos.concat(todos);
    const newState = {
      ...state,
      todos: newTodo,
      isLoaded: true,
      isLoading: false,
      error: null
    };
    return newState;
  }),
  on(deleteTodo, (state, { id }) => {
    const newTodos = state.todos.filter((todo: Todo) => {
      return todo.id !== id;
    });
    const newState = {
      ...state,
      todos: newTodos
    };
    return newState;
  })
);

export function todoReducer(state: TodoState | undefined, action: Action) {
  return todoReducerFuction(state, action);
}
