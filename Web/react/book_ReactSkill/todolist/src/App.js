import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MyComponent from './MyComponent';
// import EventPractice from './EventPractice';
import ValidationSample from './ValidationSample';


class App extends Component {

  render() {
    return (
      // <MyComponent age={35}/>
      // <EventPractice />
      <ValidationSample />
    );
    
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
