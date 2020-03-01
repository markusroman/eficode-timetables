// @flow

import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
import '../map.css';
const { BaseLayer } = LayersControl;

const ACCESS_TOKEN =
  'sk.eyJ1IjoibWFya3Vzcm9tYW4iLCJhIjoiY2s3OHEzNXh0MGhwczNsbnl5bm0zbWpjZSJ9.Yeq0LjbnbitSVkqHUH1cbg';

const places = [
  {
    name: 'Eficode HQ',
    lat: 60.169392,
    lon: 24.925751
  },
  {
    name: 'TUT',
    lat: 61.44982,
    lon: 23.85863
  },
  {
    name: 'Kamppi',
    lat: 60.168499,
    lon: 24.93248
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

const styles = theme => ({
  paper: {
    padding: theme.spacing(2),
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing(4)
  }
});

const BackgroundMap = props => {
  const { classes } = props;

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item>
        <Paper className={classes.paper}>
          <Map center={[places[0].lat, places[0].lon]} zoom={13}>
            <LayersControl position="topright">
              <BaseLayer checked name="Digitransit">
                <TileLayer
                  url="https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png"
                  attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                  id="hsl-map"
                />
              </BaseLayer>
              <BaseLayer name="OpenStreetMap">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                />
              </BaseLayer>
              <BaseLayer name="Swedish">
                <TileLayer
                  url="https://cdn.digitransit.fi/map/v1/{id}/{z}/{x}/{y}@2x.png"
                  attribution='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                  id="hsl-map-sv"
                />
              </BaseLayer>
              <BaseLayer name="Mapbox Satellite">
                <TileLayer
                  url={`https://api.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.jpg90?access_token=${ACCESS_TOKEN}`}
                  attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                  id="mapbox.satellite"
                />
              </BaseLayer>
              <BaseLayer name="Mapbox Streets">
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`}
                  attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                />
              </BaseLayer>
              <BaseLayer name="Mapbox Dark">
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`}
                  attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                />
              </BaseLayer>
              <BaseLayer name="Mapbox Light">
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token=${ACCESS_TOKEN}`}
                  attribution='© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  maxZoom={19}
                  tileSize={512}
                  zoomOffset={-1}
                />
              </BaseLayer>
              {places.map((item, index) => {
                return (
                  <Marker position={[item.lat, item.lon]} key={index}>
                    <Popup>{item.name}</Popup>
                  </Marker>
                );
              })}
            </LayersControl>
          </Map>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(BackgroundMap);
