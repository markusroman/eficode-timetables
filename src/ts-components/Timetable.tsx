import React, { useState } from 'react';
import { useTimetables } from '../hooks/timetables2';
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
import ItineraryInfo from './Itinerary';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

interface Timetables {
  loading: boolean;
  data: any;
  error: any;
  changeDestination: CallableFunction;
  switchDirection: CallableFunction;
  refresh: CallableFunction;
  placeNames: string[];
}

interface Itinerary {
  walkDistance: number;
  duration: number;
  startTime: number;
  endTime: number;
  legs: {
    mode: string;
    trip: {
      routeShortName: string;
    };
  };
}

interface Coords {
  lat: Number;
  lon: Number;
}

// Name and corresponding coordinates for specific places in a map.
const places = new Map([
  [
    'Eficode HQ',
    {
      lat: 60.169392,
      lon: 24.925751
    }
  ],
  [
    'TUT',
    {
      lat: 61.44982,
      lon: 23.85863
    }
  ],
  [
    'Kamppi',
    {
      lat: 60.168499,
      lon: 24.93248
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
    'Airport',
    {
      lat: 60.314707,
      lon: 24.948027
    }
  ]
]);

/**
 * @description Creates the custom styles that are used in the component
 * @param {object} theme Material-UI theme that provides primary and secondary colors and spacing
 */

const styles = (theme: any) => ({
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

/**
 * @description React component that renders all elements of the page. Keeps
 * track of the currently chosen destination and handles events when regular
 * or radio buttons are clicked.
 */
const Timetable = (props: any): JSX.Element => {
  const [destination, setDestination] = useState('TUT');
  const A: Coords = {
    lat: 60.169392,
    lon: 24.925751
  };
  const B: Coords = {
    lat: 61.44982,
    lon: 23.85863
  };
  const timetables: Timetables = useTimetables(A, B);
  const { classes } = props;

  // Event handler for radio buttons
  const handleChange = (event: any): void => {
    const chosen: string = event.target.value;
    setDestination(chosen);
    timetables.changeDestination(places.get(chosen), chosen);
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

  // Queried data in a simpler form
  const itineraries: Itinerary[] = timetables.data.plan.itineraries;
  return (
    <div>
      <CssBaseline>
        <Grid container className={classes.container} spacing={1}>
          <Grid item xs={11} sm={9} md={7}>
            <Paper className={classes.header}>
              <FormControl>
                <RadioGroup
                  name="destination"
                  value={destination}
                  onChange={handleChange}
                  row
                >
                  <FormControlLabel
                    value="TUT"
                    control={<Radio color="secondary" />}
                    label="TUT"
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
                    value="Airport"
                    control={<Radio color="secondary" />}
                    label="Airport"
                    labelPlacement="bottom"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="h4" className={classes.header}>
                From {timetables.placeNames[0]} to {timetables.placeNames[1]}
              </Typography>
            </Paper>
          </Grid>
          {itineraries.map((item: Itinerary, index: number) => {
            return (
              <Grid item key={index} xs={11} sm={9} md={7}>
                <Paper className={classes.paper}>
                  <ItineraryInfo item={item} />
                </Paper>
              </Grid>
            );
          })}
          <Grid container className={classes.container} spacing={3}>
            <Grid item>
              <Button
                id="button-refresh"
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
