import { Component, OnInit } from '@angular/core';
import {Todo} from '../model/todo.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { TodoService } from '../service/todo.service';
import { SubTasksService } from '../service/sub-tasks.service';


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private subtaskService: SubTasksService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  private todos: Todo[] = [];
  private selectedTodo: Todo;

  private subTodos: Todo[] = [];
  userId: string;

  public ngOnInit(){
    if (!this.userId) return;

    var x = this.todoService.getTodos(this.userId);
    x.snapshotChanges().subscribe(item => {
      this.todos = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.todos.push(y as Todo);
      });
    });
  }

  onAddTodo(todo: Todo) {
    console.log("Add to do ");
    todo.userId = this.userId;
    console.log(todo);
    this.todoService.insertTodo(todo);
  }

  onToggleTodoComplete(todo: Todo) {
    console.log("Toggle complete");
    todo.userId = this.userId;
    console.log(todo);
      this.todoService.toggleTodoComplete(todo);
  }

  onRemoveTodo(todo: Todo) {
    console.log("Remove");
    this.todoService.deleteTodo(todo.$key);
    this.subtaskService.deleteAllTodo();
  }

  onAddSubTodo(todo: Todo) {
    console.log("Add sub to do ");
    todo.userId = this.userId;
    console.log(todo);
    this.subtaskService.insertTodo(todo);
  }

  onToggleSubTodoComplete(todo: Todo) {
    console.log("Toggle Sub complete");
    todo.userId = this.userId;
    console.log(todo);
    this.subtaskService.toggleTodoComplete(todo);
  }

  onRemoveSubTodo(todo: Todo) {
    console.log("Remove Sub");
    this.subtaskService.deleteTodo(todo.$key);
  }

  onSelectedToDo(todo: Todo){
    console.log( "Todo selected: ");
    console.log(todo);
    this.selectedTodo = todo;
    var x = this.subtaskService.getSubTodos(this.userId, todo);
    x.snapshotChanges().subscribe(item => {
      this.subTodos = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y["$key"] = element.key;
        this.subTodos.push(y as Todo);
      });
    });
  }

}
