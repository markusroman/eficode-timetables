import { PLAN_ROUTE } from '../queries/route';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

/**
 * @description Hook for getting a timetable between two points. Offers methods for swapping direction and refreshing the timetable.
 * @param {object} pointA Latitude and longitude for the source point
 * @param {object} pointB Latitude and longitude for the destination point
 * @returns {boolean} loading that tells if query has finished
 * @returns {object} data that includes the query response in JSON format
 * @returns {object} error that contains the error message if an error occured during the query
 * @returns {function} changeDestination that updates the destination point
 * @returns {function} switchDirection that changes direction between the endpoints
 * @returns {function} refresh that makes a new query with new variables
 * @returns {array} placeNames that includes the names of the endpoints
 */
export const useTimetables = (pointA, pointB) => {
  const [places, setPlaces] = useState([pointA, pointB]);
  const [placeNames, setPlaceNames] = useState(['Eficode HQ', 'TUT']);
  const [now, setNow] = useState(new Date());

  const from = places[0];
  const to = places[1];

  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours() * 60 * 60 +
    now.getMinutes() * 60 +
    now.getSeconds()}`;

  // Query that fetches data from the API endpoint
  const { loading, error, data, refetch } = useQuery(PLAN_ROUTE, {
    variables: {
      fromLat: from.lat,
      fromLon: from.lon,
      toLat: to.lat,
      toLon: to.lon,
      date,
      time
    }
  });

  // Changes the destination point
  const changeDestination = (newCoords, newName) => {
    console.log('New destination', newName);
    setPlaces([pointA, newCoords]);
    setPlaceNames(['Eficode HQ', newName]);
    refetch({
      variables: {
        fromLat: from.lat,
        fromLon: from.lon,
        toLat: to.lat,
        toLon: to.lon,
        date,
        time
      }
    });
  };

  // Fetches fresh itineraries
  const refresh = () => {
    setNow(new Date());
    console.log('Refetch');
    refetch({
      variables: {
        fromLat: from.lat,
        fromLon: from.lon,
        toLat: to.lat,
        toLon: to.lon,
        date,
        time
      }
    });
  };

  // Changes the order in state variables
  const switchDirection = () => {
    setPlaces([to, from]);
    setPlaceNames([placeNames[1], placeNames[0]]);
    console.log('Switch direction');
    refetch({
      variables: {
        fromLat: from.lat,
        fromLon: from.lon,
        toLat: to.lat,
        toLon: to.lon,
        date,
        time
      }
    });
  };

  return {
    loading,
    data,
    error,
    changeDestination,
    switchDirection,
    refresh,
    placeNames
  };
};
