import React, { Component } from "react";
import axios from "axios";
import { url } from "../../../config/constants";
import { Link, NavLink } from "react-router-dom";
import UserSearch from "./searchbar";
import { isPromise } from "formik";
import Spinner from "../../common/Spinner"
class userInfo extends Component {
  state = {
    allUser: [],
    specificId: "",
    searchfield: "",
    isBlocked: false
  };
  componentDidMount() {
    axios
      .get(url + "/api/customer/allcustomers")
      .then(res => {
        console.log(res.data.body.data);
        this.setState({ allUser: res.data.body.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  getDetails = e => {
    this.props.history.push({
      pathname: "/admin/userdetails",
      state: { email: e.target.id }
    });
  };

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };

  changeStatusBlock = email => {
    axios
      .post(url + "/api/customer/customerBlock", { email: email })
      .then(res => {
        this.setState({
          allUser: res.data.body.data
        });
      });
  };
  changeStatusUnBlock = email => {
    axios
      .post(url + "/api/customer/customerUnblock", { email: email })
      .then(res => {
        console.log(res);
        this.setState({
          allUser: res.data.body.data
        });
      });
  };

  render() {
    console.log(this.state.allUser);
    console.log(this.state.searchfield);

    const { allUser, searchfield } = this.state;

    const filteredUsers = allUser.filter(users => {
      return users.name.toLowerCase().includes(searchfield.toLowerCase());
    });


    console.log(filteredUsers);
    return (
      <div className="container">
        <div>
          <Link to="/admin/landing">
            <button type="button" class="btn btn-indigo" id="promo_add">
              <i class="fas fa-arrow-left fa-sm pr-2" aria-hidden="true" />
              Back
              </button>
          </Link>
        </div>
        <div>
          <h2 className="admin_landing">Welcome Admin</h2>
          <h3 className="admin_landing">User Details</h3>
          <UserSearch id="user_search" searchChange={this.onSearchChange} /></div>
        {(filteredUsers.length !== 0) ?
          <div>
            <table className="table table-striped">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>View Details</th>
                <th>Block/Unblock</th>
              </tr>


              {filteredUsers.map(eachuser => (
                <tr>
                  <td>{eachuser.name}</td>
                  <td>{eachuser.email}</td>
                  <td>
                    <button
                      id={eachuser.email}
                      type="button"
                      className="btn btn-default btn-primary"
                      onClick={this.getDetails}
                    >
                      View Details
                    </button>
                  </td>
                  {!eachuser.isBlocked ? (
                    <td>
                      <button
                        type="button"
                        className="btn btn-default btn-danger"
                        onClick={e => this.changeStatusBlock(eachuser.email)}
                      >
                        Block
                      </button>
                    </td>
                  ) : (
                      <td>
                        <button
                          type="button"
                          className="btn btn-default btn-success"
                          onClick={e => this.changeStatusUnBlock(eachuser.email)}
                        >
                          Unblock
                      </button>
                      </td>
                    )}
                </tr>
              ))}
            </table></div>
          :
          <div>
            {(searchfield !== '') ? (<div>{
              <div className="container">
                <table className="table table-striped">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>View Details</th>
                    <th>Block/UnBlock</th>
                  </tr>
                  <h2>No such users Found</h2>
                </table>
              </div>
            }</div>):(<div>{

              <div className="container">
                  <table className="table table-striped">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>View Details</th>
                    <th>Block/UnBlock</th>
                  </tr>
                 
                </table>
                <Spinner />
              </div>
           
            }</div>)}</div>
        }</div>)
  }
}

export default userInfo;
