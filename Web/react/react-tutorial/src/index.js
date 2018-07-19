import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ShoppingList from './ShoppingList';
import Game from './Board';
import Clock from './Clock';
import Toggle from './Toggle';
import LoginControl from './LoginControl';
import NumberList from './ListNKeys';
import NameForm from './ExForms'; 
import {EssayForm} from './ExForms';
import Calculator from './ExLiftingStateUp';
import ExComposition from './ExComposition'

import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
//ReactDOM.render(<ShoppingList />, document.getElementById('shoppinglist'));
// ReactDOM.render(<Game/>, document.getElementById('square'));

/**
 * State 
 */
// ReactDOM.render(<Clock/>, document.getElementById('clock-example'));

/** 
 * 6. Handling Event
 */
// ReactDOM.render(<Toggle/>, document.getElementById('toggle'));

/**
 * 7. Conditional Rendering
 */
// ReactDOM.render(<LoginControl/>, document.getElementById('greeting'));

/**
 * 8. Lists and Keys
 */
const numbers = [1, 2, 3, 4, 5];
// ReactDOM.render(<NumberList numbers={numbers}/>, document.getElementById('doubled'));

/**
 * 9. Forms
 */
// ReactDOM.render(<NameForm />, document.getElementById('name-form'));
// ReactDOM.render(<EssayForm />, document.getElementById('essay-form'));   

/**
 * Lifting State Up
 */
// ReactDOM.render(<Calculator />, document.getElementById('calculator'));

/**
 * Coposition vs Inheritance
 */
ReactDOM.render(<ExComposition />, document.getElementById('excomposition'));
registerServiceWorker();
