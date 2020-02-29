// @flow

import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import '../map.css';

const places = [
  {
    name: 'Eficode HQ',
    lat: 60.198626,
    lon: 24.937843
  },
  {
    name: 'TUT',
    lat: 61.449821,
    lon: 23.858629
  },
  {
    name: 'Kamppi',
    lat: 60.167389,
    lon: 24.93108
  },
  {
    name: 'Oulu',
    lat: 65.012093,
    lon: 25.465076
  },
  {
    name: 'Airport',
    lat: 60.314707,
    lon: 24.948027
  }
];

export default function BackgroundMap() {
  const position = [places[0].lat, places[0].lon];
  return (
    <Map center={position} zoom={12}>
      <TileLayer
        url="https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png"
        attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
        maxZoom={19}
        tileSize={512}
        zoomOffset={-1}
        id="hsl-map"
      />
      {places.map((item, index) => {
        return (
          <Marker position={[item.lat, item.lon]} key={index}>
            <Popup>{item.name}</Popup>
          </Marker>
        );
      })}
    </Map>
  );
}
