import React from 'react';
import { useTimetables } from '../hooks/timetables';
import CircularProgress from '@material-ui/core/CircularProgress';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Itinerary from './Itinerary';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';

const eficode = {
  lat: 60.198626,
  lon: 24.937843
};
const tty = {
  lat: 61.449821,
  lon: 23.858629
};

const styles = theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    padding: theme.spacing(4)
  },
  loading: {
    justifyContent: 'center',
    marginTop: theme.spacing(8)
  }
});

const Timetable = props => {
  const timetables = useTimetables(eficode, tty);

  const { classes } = props;

  if (timetables.loading) {
    return (
      <CssBaseline>
        <Grid container className={classes.loading}>
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
          <Grid item xs={8}>
            <Typography
              justify="center"
              align="center"
              variant="h4"
              className={classes.header}
            >
              From {timetables.placeNames[0]} to {timetables.placeNames[1]}
            </Typography>
          </Grid>
          {itineraries.map((item, index) => {
            return (
              <Grid item key={index} xs={7}>
                <Paper className={classes.paper}>
                  <Itinerary item={item} />
                </Paper>
              </Grid>
            );
          })}
          <Grid container className={classes.container} spacing={3}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => timetables.refresh()}
              >
                <RefreshRoundedIcon />
              </Button>
            </Grid>
            <Grid item>
              <Button
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
