import { createSelector } from 'reselect';
import { RootState } from '../../store/store';

const selectWalksState = (state: RootState) => state.walks;

export const selectAllWalks = createSelector(
  [selectWalksState],
  walksState => walksState.list,
);

// switch to choose between Cheetah and Ari (or any user configured name)
export const makeSelectWalksByDog = (dogName: string) =>
  createSelector([selectAllWalks], walks =>
    walks.filter(walk => walk.dogs.includes(dogName.toLowerCase()))
  );

export const selectLastWalk = createSelector(
    [selectAllWalks],
    (walks) => {
        const now = Date.now();

        // Since walks are already sorted DESC, the first one that's < now is the last completed walk
        for (const walk of walks) {
            if (walk.date < now) {
                return walk;
            }
        }
        return undefined; // if no past walk found
    },
);

