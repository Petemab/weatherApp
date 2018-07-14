import React from 'react';
import Map from '../common/Map';
import AutoComplete from '../common/AutoComplete';
import axios from 'axios';


class Home extends React.Component{

  state={
    location: {
    }
  }

  handleChange = ({ target: { name, value } }) => {
    const errors = {...this.state.errors, [name]: '' };
    this.setState({ errors, [name]: value });

  }

  handlePlaceChange = ({ formatted_address: address, geometry: { location
  } }) => {
    this.setState({ address, location: location.toJSON() }, () =>
      console.log(this.state.address, this.state.location.lat, this.state.location.lng));
  }

  weatherSearch = (e) => {
    e.preventDefault();
    axios
      .get(`https://api.darksky.net/forecast/dff68e5bd33204f9893ceee31d4ce1cb/${this.state.location.lat},${this.state.location.lng}`)
      .then(res => this.setState({ forecast: res.data }, () =>
        console.log(this.state)));
  }


  render() {
    const { forecast, address } = this.state;
    console.log('render', address, forecast);
    if(!this.state) return null;
    return (
      <div>
        <h1>Check Your Weather Forecast Below</h1>
        <div className="field">
          <label htmlFor="address">Where would you like to find a forecast for?</label>
          <AutoComplete id="address" name="address" className="input"
            placeholder="Address" handlePlaceChange={this.handlePlaceChange} />
        </div>
        <button className="button"onClick={this.weatherSearch}>Find Forecast</button>

        {this.state.forecast &&
          <div>
            <h1>You searched for the weather in {address}</h1>
            <p>The weather is currently {forecast.currently.summary}</p>
            <p>Looking ahead to rest of the week: {forecast.daily.summary}</p>
            <Map className="map" center={this.state.location}/>
          </div>
        }
      </div>


    );

  }
}

export default Home;
