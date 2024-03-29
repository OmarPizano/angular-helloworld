import { Routes } from '@angular/router';
import { NameListComponent } from './components/name-list/name-list.component';
import { AboutComponent } from './components//about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'name-list', component: NameListComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
