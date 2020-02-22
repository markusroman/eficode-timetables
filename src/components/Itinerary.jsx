/* eslint-disable indent */
import React from 'react';
import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
import DirectionsBusIcon from '@material-ui/icons/DirectionsBus';
import DirectionsTransitIcon from '@material-ui/icons/DirectionsTransit';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const secondsToDisplay = unixTimestamp => {
  const dateObj = new Date(unixTimestamp * 1000);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const formattedTime =
    hours.toString().padStart(2, '0') +
    ':' +
    minutes.toString().padStart(2, '0');
  return formattedTime;
};
const parseLegs = legs => {
  let total = 0;
  let legTypes = [];
  legs.forEach(item => {
    console.log(item);
    total += item.distance;
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
  legTypes.pop();
  return { totalDistance: Math.round(total / 100) / 10, legTypes };
};

const Itinerary = ({ item }) => {
  const legInfo = parseLegs(item.legs);
  return (
    <>
      <Typography justify="center" align="center">
        {`${secondsToDisplay(item.startTime / 1000)} - ${secondsToDisplay(
          item.endTime / 1000
        )}   ||   Walking distance ${Math.round(item.walkDistance / 100) /
          10} km   ||   total duration ${Math.round(item.duration / 60)} min`}
      </Typography>

      <Grid container justify="center">
        {legInfo.legTypes.map((item, index) => {
          return (
            <Grid item key={index}>
              {item}
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default Itinerary;
