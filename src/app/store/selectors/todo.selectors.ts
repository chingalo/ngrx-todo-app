import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { TodoState } from '../reducers/todo.reducers';

// get state of todo
const getTodoState = createSelector(
  getRootState,
  (state: State) => {
    return state.todos;
  }
);

export const getAllTodos = createSelector(
  getTodoState,
  (todoState: TodoState) => {
    return todoState.todos;
  }
);

export const getLoadingStatus = createSelector(
  getTodoState,
  (todoState: TodoState) => {
    return todoState.isLoading;
  }
);
