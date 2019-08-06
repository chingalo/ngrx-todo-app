import { createAction, props } from '@ngrx/store';
import { Todo } from 'src/app/models';

export const addTodos = createAction(
  '[Todo] add todo',
  props<{ todos: Todo[] }>()
);
export const loadTodos = createAction('[Todo] load todo');
export const deleteTodo = createAction(
  '[Todo] delete todo',
  props<{ id: string }>()
);
