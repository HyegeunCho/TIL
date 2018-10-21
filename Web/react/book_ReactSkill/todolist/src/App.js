import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import MyComponent from './MyComponent';
// import EventPractice from './EventPractice';
// import ValidationSample from './ValidationSample';
// import ScrollBox from './ScrollBox';
// import IterationSample from './IterationSample';
import LifeCycleSample from './LifeCycleSample';

function getRandomColor() {
  return '#'+Math.floor(Math.random() * 16777215).toString(16);
}

class App extends Component {

  state = {
    color: '#000000'
  }

  handleColor = () => {
    this.setState({
      color: getRandomColor()
    });
  }

  render() {
    return (
      // <MyComponent age={35}/>
      // <EventPractice />
      // <ValidationSample />
      // <div>
      //   <ScrollBox ref={(ref)=>{this.scrollBox=ref}}/>
      //   <button onClick={()=>this.scrollBox.scrollToBottom()}>맨 밑으로</button>
      // </div>
      // <IterationSample /> 
      <div>
        <button onClick={this.handleColor}>랜던 색상</button>
        <LifeCycleSample color={this.state.color}/>
      </div>
      
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
