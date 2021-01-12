import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(public userService: AdminService,
    private router: Router) { }

    ngOnInit(): void {
      this.getallUtilisateur();
    }

    getallUtilisateur(): void {
      this.userService.getUtilisateurs().subscribe((resp: any) => {
        this.users = resp;
        console.log(this.users);
      });
    }

    deleteUser(mat: string){
      this.userService.delete(mat).subscribe(res => {
           this.users = this.users.filter(item => item.mat !== mat);
           console.log('User deleted successfully!');
      })
    }


}
