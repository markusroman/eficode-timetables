/* eslint-disable indent */
import React from 'react';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

interface Leg {
  mode: string;
  trip: {
    routeShortName: string;
  };
}

interface Itinerary {
  walkDistance: number;
  duration: number;
  startTime: number;
  endTime: number;
  legs: Leg[];
}

/**
 * @description Parses the timestamp to a human-readable presentation.
 * @param {number} unixTimestamp Timestamp in unix timestamp form.
 * @returns A string representation of the timestamp.
 */
const secondsToDisplay = (unixTimestamp: number): string => {
  const dateObj = new Date(unixTimestamp * 1000);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedTime =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0');
  return formattedTime;
};

/**
 * @description Parses the timestamp to a human-readable presentation.
 * @param {number} secs Timestamp in seconds.
 * @returns A string representation of total hour(s) and/or minute(s).
 */

const secondsToDuration = (secs: number): string => {
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);

  const hDisplay = h > 0 ? h + (h === 1 ? ' h ' : ' hours ') : '';
  const mDisplay = m > 0 ? m + (m === 1 ? ' min' : ' minutes') : '';
  return hDisplay + mDisplay;
};

/**
 * @description Goes through the legs list and
 * @param {list} legs List that contains the different legs of the itinerary.
 * @returns An object that contains the total distance of the itinerary and a list of icons
 * representing the different transportation modes.
 */

const parseLegs = (legs: Leg[]): any[] => {
  let legTypes: any[] = [];
  legs.forEach((item: Leg) => {
    switch (item.mode) {
      case 'WALK':
        legTypes.push(<DirectionsWalkIcon fontSize="small" />);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
      case 'BUS':
        legTypes.push(<DirectionsBusIcon fontSize="small" />);
        legTypes.push(item.trip.routeShortName);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
      case 'TRAM':
        legTypes.push(<DirectionsTransitIcon fontSize="small" />);
        legTypes.push(item.trip.routeShortName);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
      case 'RAIL':
        legTypes.push(<DirectionsTransitIcon fontSize="small" />);
        legTypes.push(item.trip.routeShortName);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
      case 'FERRY':
        legTypes.push(<DirectionsBoatIcon fontSize="small" />);
        legTypes.push(item.trip.routeShortName);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
      default:
        legTypes.push(<DirectionsTransitIcon fontSize="small" />);
        legTypes.push(<ChevronRightRoundedIcon fontSize="small" />);
        break;
    }
  });
  /* Remove the last arrow icon from the icons list as it is unnecessary. */
  legTypes.pop();
  return legTypes;
};

/**
 * @description React component that renders information regarding an itinerary. Contains information about the time,
 * distance, duration and the different transportation modes.
 */
const Itinerary = (props: any): JSX.Element => {
  const item: Itinerary = props.item;
  const legTypes = parseLegs(item.legs);
  return (
    <React.Fragment>
      <Typography>
        {`${secondsToDisplay(item.startTime / 1000)} - ${secondsToDisplay(
          item.endTime / 1000
        )}   ||   Walking distance ${Math.round(item.walkDistance / 100) /
          10} km   ||   Total duration ${secondsToDuration(item.duration)}`}
      </Typography>
      <Grid container justify="center">
        {legTypes.map((item, index) => {
          return (
            <Grid item key={index}>
              {item}
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};
Itinerary.prototypes = {
  item: PropTypes.object.isRequired
};
export default Itinerary;
