import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header'
import Routes from './Routes'
class App extends Component {
  constructor() {
    super()
    this.state = {
     
    }
  }
  render() {
    return (
      <div className="App">
      <Header/>
      <div className='spacer'>
      <Routes/>
      </div>
      </div>
    );
  }
}

export default App;
