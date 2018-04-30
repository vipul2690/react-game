import React from 'react';
import {render} from 'react-dom';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Card = (props) => {
  return (
    <div>
      <img width="75" src={props.avatar_url} />
      <div style={{display: 'inline-block', marginLeft: 10}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>
          {props.name}
        </div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return (
    <div>
      {props.cards.map(card => <Card {...card}/>)}
    </div>
  )
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: ''}
  }

  handleSubmit = (event) => {
    event.preventDefault();
    axios.get(`https://api.github.com/users/${this.state.userName}`)
      .then(resp => {
        this.props.onSubmit(resp.data);
        this.setState({userName: ''})
      });
    console.log('Event submit', this.state.userName);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          value={this.state.userName}
          onChange={(event) => this.setState({userName: event.target.value})}
          placeholder="Github Username" required/>
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  addNewCard = (cardInfo) => {
    this.setState(prevState => ({
      cards: prevState.cards.concat(cardInfo)
    }));
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));