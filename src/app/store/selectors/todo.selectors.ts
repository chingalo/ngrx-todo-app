import { createSelector } from '@ngrx/store';
import { getRootState, State } from '../reducers';
import { TodoState, todoAdapter } from '../reducers/todo.reducers';
import * as _ from 'lodash';

// get selector from entity of todo adpator
// get selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = todoAdapter.getSelectors();

const getTodoState = createSelector(getRootState, (state: State) => {
  return state.todos;
});

export const getAllTodos = (data: any) =>
  createSelector(getTodoState, (todoState: TodoState) => {
    console.log({ data });
    const todos = selectAll(todoState);
    // return _.orderBy(todos, "id");
    return todos;
  });

const getTotal = createSelector(getTodoState, (todostate: TodoState) => {
  return selectTotal(todostate);
});

const getTodoIds = createSelector(getTodoState, (todostate: TodoState) => {
  return selectIds(todostate);
});

const getTodoEntities = createSelector(getTodoState, (todostate: TodoState) => {
  return selectEntities(todostate);
});

export const getLoadingStatus = createSelector(
  getTodoState,
  (todoState: TodoState) => {
    return todoState.isLoaded;
  }
);

export const getTodoCurrentState = createSelector(
  getAllTodos,
  getTotal,
  getTodoIds,
  getTodoEntities,
  (todos, total, ids, entities) => {
    console.log({ todos, total, ids, entities });
    return { todos, total, ids, entities };
  }
);
