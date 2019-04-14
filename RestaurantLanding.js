import React, { Component } from "react";
import axios from "axios";
import RestaurantList from "./RestaurantList";
import RestaurantSearch from "./RestaurantSearch";
import RestaurantDetails from "./RestaurantDetails";
import NoRestaurant from "./NoRestaurant";
import Spinner from "../common/Spinner"
import './restaurant.css';
import {
  url
} from "../../config/constants"


export default class RestaurantLanding extends Component {
  state = {
    restaurants: [],
    searchfield: "",
    specificId: ""
  };

  componentDidMount() {
    axios
      .get(url+'/OMF/restaurantlist')
      .then(res => {
        console.log(res.data.body)
        this.setState({
          restaurants: res.data.body.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  onSearchChange = event => {
    this.setState({ searchfield: event.target.value });
  };
  getDetails = event => {
    this.setState({
      specificId: event
    });
  };

  render() {
    const { restaurants, searchfield } = this.state;
    const filteredRestaurants = restaurants.filter(restaurant => {
      return restaurant.resName
        .toLowerCase()
        .includes(searchfield.toLowerCase());
    });

   
      return (
        <div id="mainreslandingpage">
          
          <span id="view_res_rant">
            <h1  className="landing_header col-sm col-md col-12">View Restaurants</h1>
            <div id="searchforreslanding">
            <RestaurantSearch searchChange={this.onSearchChange} />
            </div>
          </span>  
          {(filteredRestaurants.length !== 0)?<div>  
                    <RestaurantList
            restaurants={filteredRestaurants}
            searchParticular={this.getDetails}
          />

          <RestaurantDetails
            specificId={this.state.specificId}
            restaurants={this.state.restaurants}
          />
      
     </div>:<div>{
      (searchfield!=='')?<div>{
   
        <div id="mainreslandingpage">
          
          <NoRestaurant />
        </div>
        
      }</div>:<div>
    {    
          <div id="mainreslandingpage">
            
      <Spinner/>
          </div>
    
      }</div>
    }</div>
  }</div>)}
}
