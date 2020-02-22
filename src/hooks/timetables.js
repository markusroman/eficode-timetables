import { PLAN_ROUTE } from '../queries/route';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';

export const useTimetables = (pointA, pointB) => {
  const [places, setPlaces] = useState([pointA, pointB]);
  const [placeNames, setPlaceNames] = useState([
    'Eficode HQ',
    'Juustenintie 3'
  ]);
  const [now, setNow] = useState(new Date());

  let from = places[0];
  let to = places[1];

  const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
  const time = `${now.getHours() * 60 * 60 +
    now.getMinutes() * 60 +
    now.getSeconds()}`;

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
    switchDirection,
    refresh,
    placeNames
  };
};
