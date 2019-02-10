import { Injectable } from '@angular/core';
import {User} from '../model/user';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://localhost:5001';  // URL to web api
  constructor( private http: HttpClient) { }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.userUrl}/api/user`).pipe(
      catchError(this.handleError('getUsers', []))
    );
  }
  // Get User by ID
  getUser(id: number): Observable<User[]> {
    const url = `${this.userUrl}/${id}`;
    return this.http.get<User[]>(url).pipe(catchError(this.handleError('getUser', [])));
  }
  // Add User after Registration.
  addUser(user: User[]): Observable<User[]> {
    return this.http.post<User[]>(this.userUrl, user, httpOptions).pipe(
      catchError(this.handleError('getUsers', [])));
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
