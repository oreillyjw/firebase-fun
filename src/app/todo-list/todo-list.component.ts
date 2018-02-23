import { Input, Output, Component, OnInit, EventEmitter, ViewEncapsulation } from '@angular/core';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class TodoListComponent implements OnInit {

  @Input()
  todos: Todo[];

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  @Output()
  selected: EventEmitter<Todo> = new EventEmitter();

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

  onSelectTodo(todo:Todo){
    this.selected.emit(todo);
  }
}
