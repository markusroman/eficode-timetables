import React, { useState } from 'react';
import { useTimetables } from '../hooks/timetables';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
import Itinerary from './Itinerary';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

const places = new Map([
  [
    'Eficode HQ',
    {
      lat: 60.198626,
      lon: 24.937843
    }
  ],
  [
    'TTY',
    {
      lat: 61.449821,
      lon: 23.858629
    }
  ],
  [
    'Kamppi',
    {
      lat: 60.167389,
      lon: 24.93108
    }
  ],
  [
    'Oulu',
    {
      lat: 65.012093,
      lon: 25.465076
    }
  ],
  [
    'Lentokenttä',
    {
      lat: 60.314707,
      lon: 24.948027
    }
  ]
]);

const styles = theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: theme.spacing(3),
    marginTop: theme.spacing(4)
  },
  loading: {
    justifyContent: 'center',
    marginTop: theme.spacing(8)
  }
});

const Timetable = props => {
  const [destination, setDestination] = useState('TTY');
  const timetables = useTimetables(places.get('Eficode HQ'), places.get('TTY'));
  const { classes } = props;

  const handleChange = event => {
    setDestination(event.target.value);
    timetables.changeDestination(
      places.get(event.target.value),
      event.target.value
    );
  };

  if (timetables.loading) {
    return (
      <CssBaseline>
        <Grid container className={classes.loading} justify="center">
          <Grid item>
            <CircularProgress color="secondary" />
          </Grid>
        </Grid>
      </CssBaseline>
    );
  }
  let itineraries = timetables.data.plan.itineraries;
  return (
    <div>
      <CssBaseline>
        <Grid container className={classes.container} spacing={1}>
          <Grid item xs={11} sm={9} md={7}>
            <Paper className={classes.header}>
              <FormControl justify="center">
                <RadioGroup
                  name="destination"
                  value={destination}
                  onChange={handleChange}
                  justify="center"
                  row
                >
                  <FormControlLabel
                    value="TTY"
                    control={<Radio color="secondary" />}
                    label="TTY"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Kamppi"
                    control={<Radio color="secondary" id="radio-Kamppi" />}
                    label="Kamppi"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Oulu"
                    control={<Radio color="secondary" />}
                    label="Oulu"
                    labelPlacement="bottom"
                  />
                  <FormControlLabel
                    value="Lentokenttä"
                    control={<Radio color="secondary" />}
                    label="Lentokenttä"
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </FormControl>
              <Typography
                justify="center"
                align="center"
                variant="h4"
                className={classes.header}
              >
                From {timetables.placeNames[0]} to {timetables.placeNames[1]}
              </Typography>
            </Paper>
          </Grid>
          {itineraries.map((item, index) => {
            return (
              <Grid item key={index} xs={11} sm={9} md={7}>
                <Paper className={classes.paper}>
                  <Itinerary item={item} />
                </Paper>
              </Grid>
            );
          })}
          <Grid container className={classes.container} spacing={3}>
            <Grid item>
              <Button
                id="refresh"
                variant="contained"
                color="secondary"
                onClick={() => timetables.refresh()}
              >
                <RefreshRoundedIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
                id="swap"
                variant="contained"
                color="secondary"
                onClick={() => timetables.switchDirection()}
              >
                <SwapHorizRoundedIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CssBaseline>
    </div>
  );
};

export default withStyles(styles)(Timetable);
