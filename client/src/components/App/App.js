/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import './App.css';
import Main from '../Main/Main';
import store from '../../store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </Provider>
  );
}

export default App;
