import React, { Component } from 'react';
import axios from 'axios';

import UserCard from './components/UserCard';
import UserForm from './components/UserForm';

const baseUrl = 'http://localhost:4000/api'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      newUser: {
        name: '',
        bio: ''
      }
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

  addUser = (e) => {
    e.preventDefault();
    axios.post(`${baseUrl}/users`, this.state.newUser)
    .then(res => {
      this.getUsers();
    })
    .catch(err => console.log(err))
  }

  updateUser = (e, itemId) => {
    e.preventDefault();
    axios
    .put(`${baseUrl}/users/${itemId}`, this.state.newUser)
    .then(res => {
      this.getUsers();
    })
    .catch(err => console.log(err))
    

  }

  deleteUser = (e, itemId) => {
    e.preventDefault();
    axios
    .delete(`${baseUrl}/users/${itemId}`)
    .then(res => {
      this.getUsers();
    })
    .catch(err => console.log(err))
  }

  handleChanges = (e) => {
    e.persist();
    this.setState(prevState => {
      return{
        newUser: {
          ...prevState.newUser,
          [e.target.name]: e.target.value
        }
      }
    })
    console.log(this.state)
  }

  render() {
    console.log(this.state.users)
    return (
      <div className="App">
        <UserForm handleChanges={this.handleChanges} addUser={this.addUser}/>
        <br/>
        {
          this.state.users.map(user => {
            return <UserCard updateUser={this.updateUser} deleteUser={this.deleteUser} user={user}/>
          })
        }
        
      </div>
    );
  }
}

export default App;
