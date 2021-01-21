import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../guards/auth-guard.service';
import { RepartitionAgentReportingComponent } from './repartition-agent-reporting/repartition-agent-reporting.component';

const routes: Routes = [
{path: '', component: RepartitionAgentReportingComponent, canActivate:[AuthGuardService] },
{path: 'reports/filter', component : RepartitionAgentReportingComponent, canActivate:[AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
