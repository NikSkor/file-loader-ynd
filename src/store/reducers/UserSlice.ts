import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface IUserState {
  str: string,
}

const initialState: IUserState = {
  str: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
      addString(state, action: PayloadAction<string>) {
        state.str = action.payload;
      }
  }
});

export default userSlice.reducer;