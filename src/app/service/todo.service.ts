import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Todo } from '../model/todo.model';
@Injectable()
export class TodoService {
  todos: AngularFireList<any>;
  currentTodo: Todo = new Todo();
  constructor(private firebase :AngularFireDatabase ) { }

  getTodos(userId: string){
    this.todos = this.firebase.list(`/todos/${userId}`);
    return this.todos;
  }

  insertTodo(todo : Todo)
  {
    this.todos.push({
      userId: todo.userId,
      content: todo.content,
      complete: todo.complete
    });
  }

  toggleTodoComplete( todo: Todo ){
    todo.complete = !todo.complete;
    this.updateTodo(todo);
  }

  updateTodo(todo : Todo){
    this.todos.update(todo.$key,
      {
        userId: todo.userId,
        content: todo.content,
        complete: todo.complete
      });
  }

  deleteTodo($key : string){
    this.todos.remove($key);
  }

}
