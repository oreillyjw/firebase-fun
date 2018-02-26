import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Todo } from '../model/todo.model';
import { Observable } from 'rxjs/Observable';
// import { ContenteditableModelDirective } from '../contenteditable-model.directive';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';


@Component({
  selector: 'todo-settings',
  templateUrl: './todo-settings.component.html',
  styleUrls: ['./todo-settings.component.css'],
})
export class TodoSettingsComponent implements OnInit {

  @Input()
  todo: Todo;

  @Output()
  contentChange: EventEmitter<Todo> = new EventEmitter();

  @ViewChild('input') input;

  edit: boolean = true;

  title: string;

  constructor() { }

  ngOnInit() {
    this.title = this.todo.content;

    this.input.valueChanges
          .debounceTime(400)
          .map(str => (<string>str).replace(' ', '-'))
          .subscribe( value => {
            this.contentChange.emit(this.todo);
          });
  }
}
