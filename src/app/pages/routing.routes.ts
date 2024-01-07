import { Routes } from '@angular/router';
import HomeComponent from './home/home.component';
import { DetailsComponent } from './details/details.component';

const PAGES_ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'details',
    component: DetailsComponent,
  },
];

export default PAGES_ROUTES;
