import { createSelector } from 'reselect';
import { RootState } from '../../store/store';


const selectWalksState = (state: RootState) => state.walks;

export const selectAllWalks = createSelector(
  [selectWalksState],
  walksState => walksState.list,
);

// last walk *in the past*
export const selectLastWalk = (state: RootState) => state.walks.lastWalk;

export const selectTopWalker = (state: RootState) => state.walks.topWalker;


const formatTimeDiff = (start: number, end: number): string => {
  const diffMs = end - start;
  const totalMinutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(hours)}:${pad(minutes)}`;
};

export const selectTimeSinceLastWalk = (state: RootState) => {
  const walk = selectLastWalk(state);
  if (!walk) return null;

  const now = Date.now();
  const walkTime = new Date(walk.date).getTime();
  return formatTimeDiff(walkTime, now);
}

// export const selectTimeSinceLastWalk = createSelector(
//   [selectLastWalk],
//   (walk) => {
//     if (!walk) return null;

//     const now = Date.now();
//     const walkTime = new Date(walk.date).getTime();
//     return(formatTimeDiff(walkTime, now));
//   }
// );

export const makeSelectTimeSinceLastActivity = (
  dogName: string,
  activity: "pee" | "poop"
) => { return(
  createSelector(
    (state: RootState) => state.walks.lastActivities,
    (lastActivities) => {
      const activityEntry = lastActivities[dogName]?.[activity];
      if (!activityEntry) return null;

      const now = Date.now();
      const walkTime = new Date(activityEntry.date).getTime();
      return formatTimeDiff(walkTime, now);
    }
  )
)}



