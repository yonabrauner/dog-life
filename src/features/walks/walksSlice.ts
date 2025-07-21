import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { onSnapshot, orderBy ,query, collection, addDoc, getDocs, getFirestore, Timestamp, serverTimestamp, FieldValue } from 'firebase/firestore';
import { AppDispatch, RootState } from '../../store/store';
import { db } from '../../firebase/config'; // assuming you already set this up


export interface dogActivity {
    dog: string;
    pee: boolean;
    poop: boolean;
}

export interface Walk {
  id: string;
  walker: string;   
  dogs: string[];     
  dogActivities: dogActivity[];
  duration: number;
  date: number;
  notes?: string;
}

interface WalksState {
  list: Walk[];
  loading: boolean;
  error: string | null;
}

const initialState: WalksState = {
  list: [],
  loading: false,
  error: null,
};

export const listenToWalks = () => (dispatch: AppDispatch) => {
  const q = query(collection(db, 'walks'), orderBy('date', 'desc'));

  const unsubscribe = onSnapshot(q, snapshot => {
    const walks = snapshot.docs.map(doc => {
        const data = doc.data() as any;
        return {
        id: doc.id,
        ...data,
        date: data.date instanceof Timestamp ? data.date.toMillis() : data.date, 
        // fallback if somehow still string (old docs)
      } as Walk;
    });

    console.log('Snapshot update, docs count:', snapshot.size);
    dispatch(setWalks(walks)); 
  });

  return unsubscribe; // so the component can stop listening when unmounted
};


export const addWalk = createAsyncThunk<Walk, Omit<Walk, 'id'> & { date?: number }>(
  'walks/add',
  async (walk) => {
    
    const dateValue: Timestamp = walk.date? Timestamp.fromMillis(walk.date) : Timestamp.now();

    console.log("Type of dateValue before addDoc:", typeof dateValue); // Should be 'object'
    console.log("Is dateValue a Timestamp instance?", dateValue instanceof Timestamp); // Should be 'true'

    
    const docRef = await addDoc(collection(db, 'walks'), {
      walker: walk.walker,
      dogs: walk.dogs,
      dogActivities: walk.dogActivities,
      duration: walk.duration,
      notes: walk.notes,
      date: dateValue,
    });

    const serializableDate = dateValue.toMillis();
    return {
      id: docRef.id,
      walker: walk.walker,
      dogs: walk.dogs,
      dogActivities: walk.dogActivities,
      duration: walk.duration,
      notes: walk.notes,
      date: serializableDate,
    };
  }
);

const walksSlice = createSlice({
  name: 'walks',
  initialState,
  reducers: {
    setWalks(state, action: PayloadAction<Walk[]>) {
      state.list = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(addWalk.fulfilled, (state, action: PayloadAction<Walk>) => {
        console.log('Added:', action.payload)
    });
  },
});

export default walksSlice.reducer;
export const { setWalks } = walksSlice.actions;
