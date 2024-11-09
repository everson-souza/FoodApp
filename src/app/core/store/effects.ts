// Services that handle side effects (like HTTP requests) in response to actions

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FoodService } from "../services/food.service";
import * as FoodActions from './actions'
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class FoodEffects {

    constructor(private actions$: Actions, private foodService: FoodService){}
 
    getFood$ = createEffect(() =>
        this.actions$.pipe(
          ofType(FoodActions.getFood),
          mergeMap(() =>
            this.foodService.getFood().pipe(
              map((food) => {
                console.log('API data received:', food);
                return FoodActions.getFoodSuccess({ food });
              }),
              catchError((error) => {
                console.error('Error in getFood effect:', error);
                return of(FoodActions.getFoodFailure({ error: error.message || 'Unknown error' }));
              })
            )
          )
        )
    );
}