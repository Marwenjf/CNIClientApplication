import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

 apiURL = 'http://localhost:8080';

 constructor(private http: HttpClient) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //get List users
  getUtilisateurs(): Observable<User> {
    return this.http.get<User>(this.apiURL + '/utilisateurs')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
 //update user
  update(mat: string, user: User): Observable<User> {
    return this.http.put<User>(this.apiURL + '/utilisateurs/update/' + mat, JSON.stringify(user), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  //delete user
  delete(mat: string){
    return this.http.delete<User>(this.apiURL + '/utilisateurs/delete/' + mat, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // Error handling
  handleError(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
 }

}
