import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from '../services/employee.service';
import { EmployeeComponent } from '../components/employee/employee.component';
import { NavBarComponent } from '../components/nav-bar/nav-bar.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { AssignCabComponent } from '../components/assign-cab/assign-cab.component';
import { AddEmployeeComponent } from '../dialogs/add-employee/add-employee.component';
import { EditEmployeeComponent } from '../dialogs/edit-employee/edit-employee.component';
import { CabComponent } from '../components/cab/cab.component';
import { AddCabComponent } from '../dialogs/add-cab/add-cab.component';
import { EditCabComponent } from '../dialogs/edit-cab/edit-cab.component';
import { AssignedCabComponent } from '../components/assigned-cab/assigned-cab.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    NavBarComponent,
    HomePageComponent,
    AssignCabComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    CabComponent,
    AddCabComponent,
    EditCabComponent,
    AssignedCabComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [EmployeeService, provideAnimationsAsync(), provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
