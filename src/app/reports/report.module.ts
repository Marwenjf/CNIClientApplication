import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { FiltreComponent } from './filtre/filtre.component';
import { AuthGuardService } from '../guards/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FiltreComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuardService
    ]
})
export class ReportModule { }
