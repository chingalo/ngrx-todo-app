import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './store/reducers';
import { loadTodos, addTodos, deleteTodo } from './store/actions';
import { Todo } from './models';
import { Observable } from 'rxjs';
import { getAllTodos, getTodoCurrentState } from './store/selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  todos$: Observable<any>;

  currentStateOfTodos$: Observable<any>;

  constructor(private store: Store<State>) {
    this.todos$ = this.store.pipe(select(getAllTodos({ name: 'joseph' })));
    this.currentStateOfTodos$ = this.store.pipe(select(getTodoCurrentState));
  }

  loadTodos() {
    this.store.dispatch({ type: '[Todo] Load Todos' });
  }

  add() {
    const todo: Todo = {
      title: 'New todo',
      description: 'description ',
      isActive: false
    };
    const todos = [todo];
    this.store.dispatch(addTodos({ todos }));
  }

  delete(id: string) {
    this.store.dispatch(deleteTodo({ id }));
  }
}
