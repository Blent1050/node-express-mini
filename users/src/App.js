import React, { Component } from 'react';
import axios from 'axios';

import UserCard from './components/UserCard';
import UserForm from './components/UserForm';

const baseUrl = 'http://localhost:4000/api'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount(){
    this.getUsers();
  }

  getUsers = () => {
    axios.get(`${baseUrl}/users`)
    .then(res => {
      this.setState({users: res.data})
    })
    .catch(err => {
      console.log(err);
    })
  }

  addUser = (user) => {
    axios.post(`${baseUrl}/users`, user)
    .then(res => this.setState({users: res.data}))
    .catch(err => console.log(err))
  }

  updateUser = () => {

  }

  deleteUser = () => {

  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <UserForm addUser={this.addUser}/>
        <br/>
        {
          this.state.users.map(user => {
            return <UserCard />
          })
        }
        
      </div>
    );
  }
}

export default App;
