import { Routes } from '@angular/router';
import { PoemView } from './components/poem-view/poem-view';

export const routes: Routes = [
  { path: '', component: PoemView, pathMatch: 'full' },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];