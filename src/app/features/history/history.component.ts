import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FoodInterface } from '../../core/models/food.interface';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../core/models/appState.interface';
import { CommonModule } from '@angular/common';
import { FoodDialogComponent } from '../../shared/components/food-dialog/food-dialog.component';
import { MatIcon } from '@angular/material/icon';
import * as FoodActions from '../../core/store/actions';
import { likedFoodSelector } from '../../core/store/selectors';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, MatIcon],
  templateUrl: './history.component.html',
  styleUrl: './history.component.sass'
})

export class HistoryComponent implements OnInit {

  likedFoods$: Observable<FoodInterface[]>;
  foodsByCategory: { [categoryName: string]: FoodInterface[] } = {};

  constructor(private store: Store<AppStateInterface>, private dialog: MatDialog) {
    this.likedFoods$ = this.store.select(likedFoodSelector);
  }

  ngOnInit() {
    this.likedFoods$.subscribe(foods => {
      this.foodsByCategory = this.groupByCategory(foods);
    });
  }

  private groupByCategory(foods: FoodInterface[]): { [categoryName: string]: FoodInterface[] } {
    return foods.reduce((acc, food) => {
      const categoryName = food.category.name;
      if (!acc[categoryName]) {
        acc[categoryName] = [];
      }
      acc[categoryName].push(food);
      return acc;
    }, {} as { [categoryName: string]: FoodInterface[] });
  }
  
  getCategories(): string[] {
    return Object.keys(this.foodsByCategory);
  }

  openFoodDialog(food: FoodInterface): void {
    this.dialog.open(FoodDialogComponent, {
      data: food,
    });
  }
  
  onClearLikedFood(){
    this.store.dispatch(FoodActions.clearLikedFoods());
  }
}


