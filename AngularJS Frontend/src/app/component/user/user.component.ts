import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  updatedUser: User;
  selectedUser: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
}
