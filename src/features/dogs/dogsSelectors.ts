import { createSelector } from 'reselect';
import { RootState } from '../../store/store';

export const selectDogsState = (state: RootState) => state.dogs;

export const selectAllDogs = createSelector(
  [selectDogsState],
  dogsState => dogsState.dogs,
);
