import { Component, OnInit } from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {
  users: User[];
  constructor(private userService: UserService, private location: Location ) { }

  ngOnInit() {
  }
  // Adds User after Registration
  add(user: User[]): void {
    this.userService.addUser(user)
      .subscribe(users => {
        this.users = users;
      });
  }
  goBack(): void {
    this.location.back();
  }
}
