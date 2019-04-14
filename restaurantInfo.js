import React, { Component } from "react";
import axios from "axios";
import { url } from "../../../config/constants";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import ResSearch from "./searchbar";
import Spinner from "../../common/Spinner"
class userInfo extends Component {
  state = {
    allRes: [],
    specificId: "",
    searchfield: ""
  };

  componentDidMount() {
    axios
      .get(url + "/api/users/restaurantusers")
      .then(res => {
        console.log(res.data.body.data);
        this.setState({ allRes: res.data.body.data });
      })
      .catch(error => {
        console.log(error);
      });
  }
  getDetails = e => {
    this.props.history.push({
      pathname: "/admin/resdetails",
      state: { email: e.target.id }
    });
  };

  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  deleteRestaurant = e => {
    console.log(e.target.id);
    axios
      .post(url + "/api/users/deleterestaurant", {
        email: e.target.id,
        resEmail: e.target.id
      })
      .then(res => {
        this.setState({
          allRes: []
        });
        axios
          .get(url + "/api/users/restaurantusers")
          .then(res => {
            console.log(res.data.body.data);
            this.setState({ allRes: res.data.body.data });
          })
          .catch(error => {
            console.log(error);
          });
        console.log(res.data);
        Swal.fire("Deleted!", "This restaurant has been deleted!", "success");
        console.log("Ok Deleted!");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    console.log(this.state.allRes);
    const { allRes, searchfield } = this.state;

    const filteredallRes = allRes.filter(users => {
      return users.name.toLowerCase().includes(searchfield.toLowerCase());
    });

    
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
            <h2 className="admin_landing">Welcome Admin</h2>
            <h3 className="admin_landing">Restaurant Details</h3>
            <ResSearch id="res_search" searchChange={this.onSearchChange} />
          {(filteredallRes.length !== 0)?<div>  <table className="table table-striped">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">View Details</th>
                <th scope="col">Delete Restaurant</th>
              </tr>
              {filteredallRes.map(eachuser => (
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
                  <td>
                    <button
                      type="button"
                      id={eachuser.email}
                      className="btn btn-default btn-danger"
                      onClick={this.deleteRestaurant}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </table>
              </div>:<div>
     {
    (searchfield!=='')?(<div>{

        <div className="container">
          <table className="table table-striped">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
            <h2>No such restaurants Found</h2>
          </table>
        </div>
      }</div>):(<div>{
       
          <div className="container">
               <table className="table table-striped">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>View Details</th>
              <th>Delete</th>
            </tr>
            
          </table>
          <Spinner/>
          </div>
      }</div>)
    }</div>
  }</div>)
}}

export default userInfo;
