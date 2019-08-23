import { Component, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from './store/reducers';
import { addTodos, deleteTodo } from './store/actions';
import { Todo } from './models';
import { Observable } from 'rxjs';
import { getAllTodos } from './store/selectors';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  todos$: Observable<any>;
  todo: Todo = {
    title: '',
    description: '',
  }
  @ViewChild('todoForm', { static: false }) form: any;

  constructor(private store: Store<State>) {
    this.todos$ = this.store.pipe(select(getAllTodos({ name: 'joseph' })));
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

  addTodo({ value, valid }: { value: Todo, valid: boolean }) {
    if (!valid) {
      console.log('err');
    } else {
      value.isActive = false;
      value.registered = new Date();
      const todos = [value];
      this.store.dispatch(addTodos({ todos }));
      this.form.reset();
    }
  }

  delete(todo: Todo) {
    const id: string = todo.id;
    this.store.dispatch(deleteTodo({ id }));
  }
}
