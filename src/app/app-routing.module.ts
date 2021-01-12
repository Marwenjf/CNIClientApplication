import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule), canActivate:[AuthGuardService]},
  {path: 'administration', loadChildren: () => import('./administration/administration.module').then(m => m.AdministrationModule), canActivate: [AuthGuardService] },
  {path: 'reports', loadChildren: () => import('./reports/report.module').then(m => m.ReportModule), canActivate:[AuthGuardService] },
  {path: 'simulation', loadChildren: () => import('./simulation/simulation.module').then(m => m.SimulationModule), canActivate:[AuthGuardService] },
  {path: 'login', component: LoginComponent },
  {path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) , pathMatch: 'full', canActivate:[AuthGuardService] },
  {path: '**', redirectTo: '/dashboard', canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
