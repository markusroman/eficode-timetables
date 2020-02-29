// @flow

import React, { createRef } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
const state = {
  hasLocation: false,
  latlng: {
    lat: 51.505,
    lng: -0.09
  }
};

export default function EventsExample() {
  const mapRef = createRef();

  const handleClick = () => {
    const map = mapRef.current;
    if (map !== null) {
      map.leafletElement.locate();
    }
  };

  const handleLocationFound = e => {
    this.setState({
      hasLocation: true,
      latlng: e.latlng
    });
  };
  const marker = state.hasLocation ? (
    <Marker position={state.latlng}>
      <Popup>You are here</Popup>
    </Marker>
  ) : null;

  return (
    <Map
      center={state.latlng}
      length={4}
      onClick={handleClick}
      onLocationfound={handleLocationFound}
      ref={mapRef}
      zoom={13}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {marker}
    </Map>
  );
}
