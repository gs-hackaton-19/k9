import React, { Component } from 'react';
import './App.css';
import Deck from './component/Deck'

class App extends Component {
  state = { pets: [] };

  componentDidMount() {
    fetch('/api/pet')
      .then(res => res.json())
      .then(pets => this.setState({ pets }));
  }

  render() {
    return (
      <div className="App">
        <Deck pets={this.state.pets} />
        Valami Más
      </div>
    );
  }
}

export default App;
