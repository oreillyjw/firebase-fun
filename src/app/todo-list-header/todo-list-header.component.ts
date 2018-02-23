import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent implements OnInit {

  newTodo: Todo = new Todo();

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  @Input()
  type: string;

  constructor() { }

  ngOnInit() {
  }

  addTodo(){
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }

}
