/* global google */

import React from 'react';


class Map extends React.Component {

  constructor() {
    super();
    this.markers = [];
    // this.pubMarkers = [];
  }


  componentDidMount() {
    this.map = new google.maps.Map(this.mapDiv, {
      center: this.props.center,
      zoom: 7
    });

    this.marker = new google.maps.Marker({
      position: this.map.getCenter(),
      map: this.map
    });




  }



  // to make sure map is destroyed after leaving page
  componentWillUnmount() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = null;
    this.marker.setMap(null);
    this.pubMarker = null;
    this.map = null;
  }

  render() {

    const className = this.props.className ? this.props.className + ' map' : 'map';
    return (

      <div className={className} ref={el => this.mapDiv = el}/>
    );
  }

}

export default Map;
