import { Component, OnInit } from '@angular/core';
import { FoodInterface } from '../../core/models/food.interface';
import { CommonModule } from '@angular/common';
import { HostListener } from '@angular/core';
import { BehaviorSubject, interval, Observable, Subscription, tap } from 'rxjs';
import { AppStateInterface } from '../../core/models/appState.interface';
import { select, Store } from '@ngrx/store';
import { errorSelector, foodSelector, isLoadingSelector, likedFoodSelector } from '../../core/store/selectors';
import * as FoodActions from '../../core/store/actions';
import { APIInterface } from '../../core/models/api.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import 'hammerjs';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './food.component.html',
  styleUrl: './food.component.sass'
})
export class FoodComponent implements OnInit {

  private subscription: Subscription = new Subscription();  
  foodQueue$ = new BehaviorSubject<FoodInterface[]>([]);
  
  currentFood: FoodInterface | null = null;
  likedFoods: FoodInterface[] = [];

  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  apiData$: Observable<APIInterface | null>;
  likedFoods$: Observable<FoodInterface[]>;


  constructor(private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.apiData$ = this.store.pipe(select(foodSelector));
    this.likedFoods$ = this.store.select(likedFoodSelector);

  }

  ngOnInit() {
    // Log to see the initial state on app load, confirming rehydration
    this.apiData$.subscribe(apiData => {
      console.log('Rehydrated API data on init:', apiData);
    });

    // Initialize likedFoods with rehydrated data
    this.likedFoods$.subscribe(likedFoods => {
      this.likedFoods = likedFoods || [];
    });

    // In order to not wait the first time to dispatch the action
    this.store.dispatch(FoodActions.getFood());

    // Dispatch the API call every 5 seconds
    this.subscription = interval(5000).pipe(
      tap(() => this.store.dispatch(FoodActions.getFood()))
    ).subscribe();

    // Update the food queue based on rehydrated or new apiData
    this.apiData$.subscribe(foodItems => {
      if (foodItems) {
        const currentQueue = this.foodQueue$.value;
        const newQueue = [
          ...currentQueue,
          ...foodItems.data.machineProducts.filter(newProduct => 
            !currentQueue.some(existingProduct => existingProduct.id === newProduct.id) &&
            !this.likedFoods.some(likedProduct => likedProduct.id === newProduct.id)
          )
        ];

        this.foodQueue$.next(newQueue);
        this.loadNextFood();
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadNextFood() {
    const currentQueue = this.foodQueue$.value;
    this.currentFood = currentQueue.length ? currentQueue[0] : null;
  }

  private advanceQueue() {
    const updatedQueue = this.foodQueue$.value.slice(1);
    this.foodQueue$.next(updatedQueue);
    this.loadNextFood();
  }

  swipeLeft() {
    this.advanceQueue();
  }

  swipeRight() {
    if (this.currentFood) {
      this.store.dispatch(FoodActions.addLikedFood({ likedFood: this.currentFood }));
    }
    this.advanceQueue();
  }

}
