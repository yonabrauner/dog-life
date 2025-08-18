import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";


interface UserState {
  uid: string | null;
  email: string | null;
  nickname: string | null;
  status: 'idle' | 'loading' | 'error';
  error: string | null;
}

const initialState: UserState = {
  uid: null,
  email: null,
  nickname: null,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk<
  { uid: string; email: string; nickname: string },
  { email: string; password: string },
  { rejectValue: string }
>('user/login', async ({ email, password }, { rejectWithValue }) => {
  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Fetch nickname from Firestore
    const snap = await getDoc(doc(db, 'users', uid));
    const nickname = snap.exists() ? snap.data()?.nickname : '';

    return { uid, email, nickname };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Email/password sign-up
export const registerUser = createAsyncThunk<
  { uid: string; email: string; nickname: string },
  { email: string; password: string; nickname: string },
  { rejectValue: string }
>('user/register', async ({ email, password, nickname }, { rejectWithValue }) => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    // Save nickname in Firestore
    await setDoc(doc(db, 'users', uid), { nickname });

    return { uid, email, nickname };
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Google sign-in
// export const loginWithGoogle = createAsyncThunk(
//   "user/loginWithGoogle",
//   async () => {
//     const res = await signInWithPopup(auth, googleProvider);
//     return { uid: res.user.uid, email: res.user.email };
//   }
// );

// Sign out
export const logoutUser = createAsyncThunk('user/logout', async () => {
  await signOut(auth);
});


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload || 'Failed to register';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.uid = action.payload.uid;
        state.email = action.payload.email;
        state.nickname = action.payload.nickname;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload || 'Failed to login';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.uid = null;
        state.email = null;
        state.nickname = null;
        state.status = 'idle';
        state.error = null;
      });
        //   .addCase(loginWithGoogle.fulfilled, (state, action) => {
        //     state.uid = action.payload.uid;
        //     state.email = action.payload.email ?? null;
        //     state.loading = false;
        //   })
  },
});

export default userSlice.reducer;