import React, { Component } from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Cards from './Card'
import { Grid } from '@material-ui/core';


const axios = require('axios');

class App extends Component {

  state = {
    city: 'Bhubaneswar',
    data: []

  }

  getCityName = (event) => {
    this.setState({
      city: event.target.value
    })
  }

  handelSubmit = (event) => {
    event.preventDefault();
    let x = this.state.city;
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${x},in&appid=a54b92c2f23341e4db393f6badcf3d0c&units=metric`)
      .then((res) => {
        this.setState({
          data: res.data.list
        })
        console.log(this.state.data)
      })
      .catch((err) => {
        console.log(err.message);

      });
    ;
  }

  render() {
    if (this.state.data.length > 0) {
      let l = this.state.data.length
      let blocks = [];
      for (let i = 0; i < l; i++) {
        blocks.push(<Cards className="card" key={i} date={this.state.data[i].dt_txt}
          temp={this.state.data[i].main.temp}
          maxTemp={this.state.data[i].main.temp_max}
          minTemp={this.state.data[i].main.temp_min}
          pressure={this.state.data[i].main.pressure}
          humidity={this.state.data[i].main.humidity}
          windSpeed={this.state.data[i].wind.speed}
          description={this.state.data[i].weather[0].description} />)
      }
      return (
        <Grid container spacing={4}>{blocks}</Grid>
      )
    }

    return (

      <div className="App" >
        <ValidatorForm autoComplete="off" onSubmit={this.handelSubmit}>
          <TextValidator required type="text" className="city" id="cityName" label="Enter City Name" variant="outlined" size="small" color="primary" value={this.state.city} onChange={this.getCityName} />
          <br /><br />
          <Button variant="outlined" color="primary" type="submit">Search</Button>
        </ValidatorForm>
        <br /><br /><br />

      </div>
    );
  }
}


export default App;
