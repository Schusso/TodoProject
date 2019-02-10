import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './component/user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './component/user-registration/user-registration.component';
import { TodoComponent } from './component/todo/todo.component';
import { TodoItemComponent } from './component/todo-item/todo-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserRegistrationComponent,
    TodoComponent,
    TodoItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
