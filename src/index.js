import React from 'react';
import ReactDOM from 'react-dom/client';
// import scss from "@scss/default.scss";
import './assets/scss/default.scss';
import Header from './components/Header';
import HeaderMui from './components/HeaderMui';

const App = () => (
  <div>
    <Header></Header>
    <HeaderMui></HeaderMui>
    <div style={{ padding: 16 }}>
      <h1>Hello, React!</h1>
    </div>
  </div>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
