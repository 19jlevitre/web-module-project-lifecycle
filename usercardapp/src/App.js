import React from 'react';
import axios from 'axios';
import styled from 'styled-components';


const StyledHeader = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: #85DCB2;
justify-content: center;



h1{
color: #e27d60;
font-family: sans-serrif;
}

form{
  margin: 10%;
  button{
    background-color: #C38D9E;
    width: 30%;
    border-radius: 10%
  }
  input{
    height: 2vh
  }
}
` 
const StyledInfo = styled.div`
background-color: #E8A87C;
border: 2px solid #C38D9E;
border-radius: 10%;
width: 150%;
align-content: center;
margin: 10%;
h2{
  font-family: sans-serrif;
  color: white;
}

p{
  font-family: comic-sans;
}
img{
  border: 2px dotted black;
  
}


`

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
    
    <StyledHeader className="App">
      <h1>THE USER CARD RETRIEVER</h1>
    <form>
      <input value={this.state.username} onChange={this.handleInput}/>
      <button onClick={this.handleSearch}>Get User</button>
      <StyledInfo>
        <h2>User: {this.state.users.login}</h2>
        <img width='150'src={this.state.users.avatar_url}/>
        <h2>Followers:{this.state.followers.map(follower => {
          return(<p>{follower.login}</p>)
        })}
        </h2>
      </StyledInfo>
    </form>
    </StyledHeader>

    );
  }
}

export default App;
