import { Routes } from '@angular/router';
import { NameListComponent } from './name-list/name-list.component';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'name-list', component: NameListComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
];
