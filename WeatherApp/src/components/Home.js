import React from 'react';
import Map from '../common/Map';
import AutoComplete from '../common/AutoComplete';


class Home extends React.Component{

  handleChange = ({ target: { name, value } }) => {
    const errors = {...this.state.errors, [name]: '' };
    this.setState({ errors, [name]: value });

  }

  handlePlaceChange = ({ formatted_address: address, geometry: { location
  } }) => {
    this.setState({ address, location: location.toJSON() }, () =>
      console.log(this.state.location.lat, this.state.location.lng));
  }

  render() {
    // const { location } = this.state.location.lat;
    // console.log('render', location);
    return (
      <div>
        <h1>Check Your Weather Forecast Below</h1>
        <div className="field">
          <label htmlFor="address">Address</label>
          <AutoComplete id="address" name="address" className="input"
            placeholder="Address" handlePlaceChange={this.handlePlaceChange} />
        </div>

        <Map className="map" center={{ lat: 51.5074, lng: 0.1278}}/>

      </div>


    );

  }
}

export default Home;
