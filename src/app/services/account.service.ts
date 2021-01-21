import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, private router: Router) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private baseUrlLogin = 'http://localhost:8080/utilisateurs';

  public loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus());
  private UserName    = new BehaviorSubject<string>(JSON.parse(localStorage.getItem('username')!));
  public UserRole    = localStorage.getItem('role')!;

// Login Method
loginUser(username: string, password: string): Observable<User>
{
  return this.http.post<User>(this.baseUrlLogin + '/loginuser/' + username + '/' + password,
   { username: username, password: password },
    this.httpOptions)
    .pipe(
      map(result => {
        // login successful
        if(result)
        {
            // store user details
            this.loginStatus.next(true);
            localStorage.setItem('loginStatus', '1');
            localStorage.setItem('username', result.mat);
            localStorage.setItem('role', result.role);
        }
         return result;
    }))
}

logout()
{
    // Set Loginstatus to false and delete saved details
    this.loginStatus.next(false);
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.setItem('loginStatus', '0');
    this.router.navigate(['login']);
    console.log('Logged Out Successfully');
}

checkLoginStatus(): boolean
{
    const loginCookie = localStorage.getItem('loginStatus');
    if (loginCookie === '1')
    {
        if (localStorage.getItem('username') !== null || localStorage.getItem('username') !== undefined)
        {
            return true;
        }
        return false;
    }
    return false;
}



get isLoggesIn()
{
    return this.loginStatus.asObservable();
}

get currentUserName()
{
    return this.UserName.asObservable();
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
