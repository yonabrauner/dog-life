import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLastWalk, fetchWalks, subscribeToWalks, createWalk, fetchLastActivity, fetchTopWalker } from '../../api/walks';
import { Dog } from '../dogs/dogsSlice';
import { GetState } from '@reduxjs/toolkit';
import { formDogActivity } from '../../screens/walkForm.screen';
import { selectAllDogs, selectDogsState } from '../dogs/dogsSelectors';
export interface DogActivity {
  id: number;
  walkId: string;
  dogId: string;
  pee: boolean;
  poop: boolean;
  dog: Dog;
  walk: Walk;
}

export interface Walk {
  id: number;
  date: number;
  duration: number;
  walkerName: string;   
  dogActivities: (formDogActivity | DogActivity)[];
  notes?: string;
}

interface WalksState {
  list: Walk[];
  lastWalk: Walk | null;
  topWalker: {walker: string; count: number};
  loading: boolean;
  error: string | null;
  lastActivities: {
    [dogName: string]: {
      pee?: Walk;
      poop?: Walk;
    };
  };
}

const initialState: WalksState = {
  list: [],
  lastWalk: null,
  topWalker: {walker: "no data", count: 0},
  loading: false,
  error: null,
  lastActivities: {},
};


// Thunk to load walks and subscribe for live updates
export const startWalksListener = createAsyncThunk< void, void, { dispatch: AppDispatch; state: RootState }>(
  "walks/startListener",
  async (_, { dispatch }) => {
    // 1. Fetch initial list of walks
    const walks = await fetchWalks();
    dispatch(setWalks(walks));

    subscribeToWalks((data) => {
      dispatch(setWalks(data)); 
    });

  }
);


export const submitWalk = createAsyncThunk<Walk, Omit<Walk, 'id'> & { date?: number }>(
  'walks/add',
  async (walk) => {
    return await createWalk(walk); // API call to backend
  }
);

// last walk *in the past*
export const getLastWalk = createAsyncThunk("walks/getLastWalk", async () => {
  console.log("getLastWalk in walkSlice was fired");
  return await fetchLastWalk();
});

export const getTopWalker = createAsyncThunk("walks/getTopWalker", async () => {
  const topWalker = await fetchTopWalker();
  return topWalker;
})

// last activities
export const getLastActivity = createAsyncThunk<
  { dogName: string; activity: "pee" | "poop"; walk: Walk | null },
  { dogName: string; activity: "pee" | "poop" }
>("walks/getLastActivity", async ({ dogName, activity }) => {
  console.log("getLastActivity in walkSlice was fired");
  const data = await fetchLastActivity(dogName, activity); // API call
  return { dogName, activity, walk: data?.walk ?? null };
});


const walksSlice = createSlice({
  name: 'walks',
  initialState,
  reducers: {
    setWalks(state, action: PayloadAction<Walk[]>) {
      state.list = action.payload;
    },
    addWalk: (state, action: PayloadAction<Walk>) => {
      state.list.unshift(action.payload); // newest first
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getLastActivity.fulfilled, (state, action) => {
        const { dogName, activity, walk } = action.payload;
        if (!state.lastActivities[dogName]) {
          state.lastActivities[dogName] = {};
        }
        state.lastActivities[dogName][activity] = walk ?? undefined;
      }).addCase(submitWalk.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
        const walk = action.payload;
        state.lastWalk = walk;
        const activities = walk.dogActivities.filter((a): a is DogActivity => 'dog' in a);
        for (const act of activities){
          if (act.pee) state.lastActivities[act.dog.name].pee = walk;
          if (act.poop) state.lastActivities[act.dog.name].poop = walk;
        }
      }).addCase(getLastWalk.pending, (state) => {
        state.loading = true;
      }).addCase(getLastWalk.fulfilled, (state, action) => {
        state.loading = false;
        state.lastWalk = action.payload;
      }).addCase(getLastWalk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch last walk";
      }).addCase(getTopWalker.fulfilled, (state, action) => {
        state.loading = false;
        state.topWalker = action.payload;
      }).addCase(getTopWalker.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch top walker";
      })
  },
});

export default walksSlice.reducer;
export const { setWalks, addWalk } = walksSlice.actions;
