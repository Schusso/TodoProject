import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import {Todo} from '../model/todo';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json-patch+json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todoUrl = 'https://localhost:5001/api/todo';
  constructor(private http: HttpClient) { }
  // Get all Todo
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.todoUrl}`).pipe(
      catchError(this.handleError('get Todos', []))
    );
  }
  // Get a Todo by Id.
  getTodo(id: number): Observable<Todo> {
    const url = `${this.todoUrl}/${id}`;
    return this.http.get<Todo>(url).pipe(
      catchError(this.handleError<Todo>(`getHero id=${id}`))
    );
  }
  // Update a Todo
  updateTodo (todo: Todo): Observable<any> {
    return this.http.put(this.todoUrl, todo, httpOptions).pipe(
      catchError(this.handleError<any>('updateHero'))
    );
  }
  // Delete a Todo
  deleteTodo(todo: Todo): Observable<Todo> {
    const id = typeof todo === 'number' ? todo : todo.id;
    const url = `${this.todoUrl}/${id}`;

    return this.http.delete<Todo>(url, httpOptions).pipe(
      catchError(this.handleError<Todo>('deleteHero'))
    );
  }
  // Error Handling here.
    private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
