import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {


  constructor(private account: AccountService, private router: Router ) { }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
    {
        return this.account.isLoggesIn.pipe(take(1), map((loginStatus: boolean) =>
        {
              const destination: string  = state.url;
              const userMat = route.params.username;

            // To check if user is not logged in
              if (!loginStatus)
            {
                this.router.navigate(['login']);

                return false;
            }

            // if the user is already logged in
            // tslint:disable-next-line:align
            if( destination === '/administration') {
                 if (localStorage.getItem('role') === 'Admin')
                        {
                            return true;
                        }
            } else if( destination === '/dashboard' || destination === '/reports') {
              if (localStorage.getItem('username') !== null || localStorage.getItem('username') !== undefined)
                        {
                            return true;
                        }
            } else {
              return false;
            }

              return false;

        }));


    }

}
