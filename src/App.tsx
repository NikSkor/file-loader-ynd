import React from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { userSlice } from './store/reducers/UserSlice';
import Main from './components/pages/Main/Main';

function App() {
  const dispatch = useAppDispatch();

  const {addNewBool} = userSlice.actions;

  const boolNull: boolean = useAppSelector(state => state.userReducer.isLoading);

  console.log('boolNull: ', boolNull);

  dispatch(addNewBool(true));

  const boolNull2: boolean = useAppSelector(state => state.userReducer.isLoading);

  console.log('boolNull2: ', boolNull2);


  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
