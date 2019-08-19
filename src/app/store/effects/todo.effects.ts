import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TodoService } from 'src/app/services/todo.service';
import { Todo } from 'src/app/models';
import * as todoActions from '../actions';

@Injectable()
export class TodoEffect {
  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Todo] Load Todos'),
      mergeMap(() =>
        this.todoService.getTodos().pipe(
          map((todos: Todo[]) => {
            return todoActions.loadTodos({ payload: todos });
          }),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(private actions$: Actions, private todoService: TodoService) {}
}
