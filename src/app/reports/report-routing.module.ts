import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { FiltreComponent } from './filtre/filtre.component';

const routes: Routes = [
{path: '', component: FiltreComponent, canActivate:[AuthGuardService] },
{path: 'reports/filter', component : FiltreComponent, canActivate:[AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
