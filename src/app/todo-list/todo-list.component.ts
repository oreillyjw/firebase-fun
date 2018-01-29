import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  @Input()
  todos: Todo[];

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  onToggleTodoComplete(todo: Todo){
    console.log("list toggle complete");
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo( todo: Todo){
    this.remove.emit(todo);
  }

}
