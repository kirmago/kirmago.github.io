import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase/firebase';

const initialState = {
  user: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: null,
};

// Async thunk for login with JWT token
export const loginUser = createAsyncThunk("auth/login", async ({ email, password, rememberMe }) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;

    const usersCollectionRef = collection(db, 'users');
    const q = query(usersCollectionRef, where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    let userData = null;
    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    // Generate JWT token
    const token = await user.getIdToken();

    // Store token securely (use HttpOnly cookie for added security)
    if (rememberMe) {
      document.cookie = `jwt=${token}; max-age=${2 * 24 * 60 * 60}; secure; HttpOnly; SameSite=Strict`;
    }

    return userData;
  } catch (error) {
    throw error.message || "Login failed";
  }
});

export const logoutUser = () => async (dispatch) => {
  // Clear the rememberMe token
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; secure; HttpOnly; SameSite=Strict";

  // Reset user state
  dispatch(reset());
};


// Function to check authentication state on page load
export const checkAuthState = () => async (dispatch) => {
  const auth = getAuth();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const uid = user.uid;

      const usersCollectionRef = collection(db, 'users');
      const q = query(usersCollectionRef, where("uid", "==", uid));
      const querySnapshot = await getDocs(q);

      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });

      dispatch(loginUser.fulfilled(userData));
    }
  });
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
      state.message = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;