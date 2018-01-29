import { Component, OnInit } from '@angular/core';
import {Todo} from '../model/todo.model';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { TodoService } from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    private todoService: TodoService,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(user => {
      if(user) this.userId = user.uid
    })
  }

  private todos: Todo[] = [];
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
  }

}
