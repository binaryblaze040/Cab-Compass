import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from '../components/employee/employee.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { AssignCabComponent } from '../components/assign-cab/assign-cab.component';
import { CabComponent } from '../components/cab/cab.component';
import { AssignedCabComponent } from '../components/assigned-cab/assigned-cab.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'assign-cab', component: AssignCabComponent },
  { path: 'cab', component: CabComponent },
  { path: 'assigned-cabs', component: AssignedCabComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
