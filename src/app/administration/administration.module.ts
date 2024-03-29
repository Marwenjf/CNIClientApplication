import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { UsersComponent } from './users/users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService } from '../guards/auth-guard.service';
import { DetailsUserComponent } from './details-user/details-user.component';


@NgModule({
  declarations: [UsersComponent, EditUserComponent, AddUserComponent, DetailsUserComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService
    ],
})
export class AdministrationModule { }
