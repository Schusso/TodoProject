import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TodoService} from '../../service/todo.service';
import {Todo} from '../../model/todo';
import { Location } from '@angular/common';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  users: User[];
  constructor(private userService: UserService,
              private location: Location,
              private todoService: TodoService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getTodo();
    this.getUsers();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.todoService.getTodo(id)
      .subscribe(todo => this.todo = todo);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    this.todoService.updateTodo(this.todo)
      .subscribe(() => this.goBack());
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}
