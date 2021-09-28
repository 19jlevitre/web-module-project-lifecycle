import React from 'react';
import axios from 'axios';
import styled from 'styled-components';



class App extends React.Component {
  state = {
     users: [],
     username: "",
     followers: [],
  }

  componentDidMount() {
    if(this.state.username !== ""){axios.get(`https://api.github.com/users/${this.state.username}`)
      .then(resp=> {
        this.setState({
          ...this.state,
          users: resp.data
        });
      })}
      
      if(this.state.username !== ""){axios.get(`https://api.github.com/users/${this.state.username}/followers`)
      .then(resp => {
        
        this.setState({
          ...this.state,
          followers: resp.data
        });
      })
  }}
  handleInput = (e)=> {
    this.setState({
      ...this.state,
      username: e.target.value
    });
  }
  handleSearch = (e)=> {
    e.preventDefault();

    axios.get(`https://api.github.com/users/${this.state.username}`)
    .then(resp => {
      this.setState({
        ...this.state,
        users: resp.data
      })
    })
    if(this.state.username !== ""){axios.get(`https://api.github.com/users/${this.state.username}/followers`)
    .then(resp => {
      
      this.setState({
        ...this.state,
        followers: resp.data
      });
    })
}

  }
   
  render () {
    
  return (
    <div className="App">
      <h1>THE USER CARD</h1>
    <form>
      <input value={this.state.username} onChange={this.handleInput}/>
      <button onClick={this.handleSearch}>Get User</button>
      <div>
        <h2>user: {this.state.users.login}</h2>
        <img width='100'src={this.state.users.avatar_url}/>
        <h3>followers:{this.state.followers.map(follower => {
          return(<p>{follower.login}</p>)
        })}
        </h3>
      </div>
    </form>
    </div>

    );
  }
}

export default App;
