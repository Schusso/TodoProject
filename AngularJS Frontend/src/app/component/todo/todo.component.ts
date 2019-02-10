import { Component, OnInit } from '@angular/core';
import {TodoService} from '../../service/todo.service';
import {Todo} from '../../model/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService) { }
  todos: Todo[];
  ngOnInit() {
    this.getTodos();
  }
  getTodos(): void {
    this.todoService.getTodos().subscribe(todos => this.todos = todos);
  }
  delete(todo: Todo): void {
    this.todos = this.todos.filter(h => h !== todo);
    this.todoService.deleteTodo(todo).subscribe();
  }
}
