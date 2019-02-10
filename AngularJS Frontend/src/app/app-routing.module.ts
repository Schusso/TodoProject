import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TodoItemComponent} from './component/todo-item/todo-item.component';
import {TodoComponent} from './component/todo/todo.component';
import {UserRegistrationComponent} from './component/user-registration/user-registration.component';

const routes: Routes = [
  {path: '', redirectTo: 'todo', pathMatch: 'full'},
  {path: 'todo', component: TodoComponent },
  {path: 'todo-Item/:id', component: TodoItemComponent},
  {path: 'user-registration', component: UserRegistrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
