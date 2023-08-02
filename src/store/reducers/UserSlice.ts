
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

// interface INameObj {
//   id: number,
//   file: File
// }

interface IUserState {
  filesList: File[],
}

const initialState: IUserState = {
  filesList: []
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
    reducers: {
      addFiles(state, action: PayloadAction<File>) {
        state.filesList.push(action.payload);
      }
  }
});

export default userSlice.reducer;