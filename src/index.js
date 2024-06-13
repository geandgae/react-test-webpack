import React from 'react';
import ReactDOM from 'react-dom/client';
// import scss from "@scss/default.scss";
import './assets/scss/default.scss';
import Header from './components/Header';

const App = () => (
  <div>
    <Header></Header>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
