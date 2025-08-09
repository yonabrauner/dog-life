import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLastActivity, getLastWalk, getTopWalker, startWalksListener } from "../features/walks/walksSlice";
import { AppDispatch } from "../store/store";
import { subscribeToWalks } from "../api/walks";
import { getDogs } from "../features/dogs/dogsSlice";
import { selectAllDogs, selectDogsState } from "../features/dogs/dogsSelectors";

export function RootInitializer() {
  const dispatch = useDispatch<AppDispatch>();
  const dogs = useSelector(selectAllDogs);
  const dogStatus = useSelector(selectDogsState).status;

  // First effect: fetch all dogs once
  useEffect(() => {
    dispatch(startWalksListener());
    if (dogStatus === 'idle') {
      dispatch(getDogs());
    }
  }, [dogStatus, dispatch]);

  // Second effect: once dogs are loaded, fetch their last activity
  useEffect(() => {
    if (dogStatus === 'succeeded') {
      const activities = ["pee", "poop"] as const;

      for (const dog of dogs) {
        for (const activity of activities) {
          dispatch(getLastActivity({ dogName: dog.name, activity }));
        }
      }

      dispatch(getLastWalk());
      dispatch(getTopWalker());

      const unsubscribe = subscribeToWalks(dispatch);
      return () => unsubscribe();
    }
    
  }, [dogStatus, dogs, dispatch]);

  return null;
}