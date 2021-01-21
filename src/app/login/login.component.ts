import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  Username!: FormControl;
  Password!: FormControl;
  returnUrl!: string;
  ErrorMessage!: string;
  invalidLogin!: boolean;

  constructor(public loginservice: AccountService, private translate: TranslateService, private router: Router, private route: ActivatedRoute,
    private fb: FormBuilder
    ) {
      translate.setDefaultLang('ar');
    }

    onSubmit()
    {
        let userlogin = this.loginForm.value;

        this.loginservice.loginUser(userlogin.Username, userlogin.Password).subscribe(result => {

            console.log("User Logged In Successfully");
            this.invalidLogin = false;
            this.router.navigateByUrl(this.returnUrl);

        },
        error =>
        {
            this.invalidLogin = true;
            this.ErrorMessage = error.error.loginError;

            console.log(this.ErrorMessage);
        })

    }

    ngOnInit() {

        // Initialize Form Controls
        this.Username = new FormControl('', [Validators.required]);
        this.Password = new FormControl('', [Validators.required]);

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';

         // Initialize FormGroup using FormBuilder
        this.loginForm = this.fb.group({
            Username : this.Username,
            Password : this.Password

        });

  }

}
