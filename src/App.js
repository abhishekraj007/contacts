import React, { Component } from 'react'
import { connect } from 'react-redux'
import {fetchUsers, addUser} from "./redux/reducers/userSlice"

export class App extends Component {

  state ={
    userName: "",
    job: ""
  }

  componentDidMount() {
    this.props.fetchUsers()
  }

  handleUserName = (e) => {
    this.setState({
      userName: e.target.value
    })
  }

  handleUserJob = (e) => {
    this.setState({
      job: e.target.value
    })
  }

  addUser = (e) => {
    e.preventDefault();
    this.props.addUser({
      "first_name": this.state.userName,
      "last_name": this.state.job
    })
  }

  render() {
    const {users: {data, loading, error}, fetchUsers} = this.props;
    const {userName, job} = this.state
    return (
      <div>

        <h2>Add User</h2>
        <form onSubmit={this.addUser}>
          <input type="text" value={userName} onChange={this.handleUserName}></input>
          <input type="text" value={job} onChange={this.handleUserJob}></input>
          <button type="submit">Add</button>
        </form>

        Users

        {loading ? <h2>Loading</h2> : null}

        {data.length ? data.map(data => {
          return <h2 key={data.first_name}>{data.first_name}</h2>
        }) : null}

        {error ? {error}: null}

        <button onClick={() => fetchUsers()}>Load more</button>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  users: state.users
})

const mapDispatchToProps = {
  fetchUsers,
  addUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
