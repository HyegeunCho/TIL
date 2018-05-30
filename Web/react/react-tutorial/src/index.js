import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingList from './ShoppingList';
import Game from './Board';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<ShoppingList />, document.getElementById('shoppinglist'));
ReactDOM.render(<Game/>, document.getElementById('square'));
registerServiceWorker();
