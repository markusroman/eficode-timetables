import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Map, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import { withStyles } from '@material-ui/core/styles';
const { BaseLayer } = LayersControl;

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

/**
 * @description A react component for testing differen map functionalities
 * without disrupting the actual map component
 */
const TestMap = props => {
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

export default withStyles(styles)(TestMap);
