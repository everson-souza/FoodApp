import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { AppStateInterface } from '../models/appState.interface';
import * as foodReducer from './reducers';

// export const reducers: ActionReducerMap<AppStateInterface> = {
//   food: foodReducer.reducers,
//   likedFood: foodReducer.
// };

export function localStorageSyncReducer(
  reducer: ActionReducer<AppStateInterface>
): ActionReducer<AppStateInterface> {
  return (state, action) => {
    if (action.type === '@ngrx/store/init' || action.type === '@ngrx/store/update-reducers') {
      console.log('Attempting to rehydrate state from localStorage...');
    }
    
    const syncedReducer = localStorageSync({keys: ['food', 'likedFoods'], rehydrate: true})(reducer);
  
    return syncedReducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [localStorageSyncReducer];


