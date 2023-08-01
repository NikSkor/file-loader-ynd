import { IUser } from "../../models/IUser";
import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface UserState {
  users: IUser[],
  isLoading: boolean,
}

const initialState = {
  users: [],
  isLoading: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
      addNewBool(state, action: PayloadAction<boolean>) {
        state.isLoading = action.payload;
      }
  }
});

export default userSlice.reducer;