import React, { Component } from 'react';
import './App.css';
import Input from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
const axios = require('axios');

class App extends Component {

  state = {
    city: 'Bhubaneswar'
  }

  getCityName = (event) => {
    this.setState({
      city: event.target.value
    })
  }
  handelSubmit = (event) => {
    var x = this.state.city;
    event.preventDefault();
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${x},in&appid=a54b92c2f23341e4db393f6badcf3d0c`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    return (

      <div className="App" >
        <form noValidate autoComplete="off" onSubmit={this.handelSubmit}>
          <Input required className="city" id="cityName" label="Enter City Name" variant="outlined" size="small" color="primary" value={this.state.city} onChange={this.getCityName} />
          <br /><br />
          <Button variant="outlined" color="primary" type="submit" >Search</Button>
        </form>
      </div>
    );
  }
}


export default App;
