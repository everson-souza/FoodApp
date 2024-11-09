import { Routes } from '@angular/router';
import { HistoryComponent } from './features/history/history.component';
import { FoodComponent } from './features/food/food.component';

export const routes: Routes = [
  { path: '', component: FoodComponent },
  { path: 'history', component: HistoryComponent },
];
