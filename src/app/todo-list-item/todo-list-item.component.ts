import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TodoListItemComponent implements OnInit {

  @Input() todo: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleTodoComplete(todo: Todo){
    console.log("Item toggle complete");
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo){
    this.remove.emit(todo);
  }

}
