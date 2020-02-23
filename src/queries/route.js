import { gql } from 'apollo-boost';

export const PLAN_ROUTE = gql`
  query Plan(
    $fromLat: Float!
    $fromLon: Float!
    $toLat: Float!
    $toLon: Float!
    $date: String!
    $time: String!
  ) {
    plan(
      from: { lat: $fromLat, lon: $fromLon }
      to: { lat: $toLat, lon: $toLon }
      date: $date
      time: $time
      numItineraries: 5
      transportModes: [
        { mode: BUS }
        { mode: RAIL }
        { mode: TRAM }
        { mode: FERRY }
        { mode: WALK }
      ]
      walkReluctance: 2.1
      walkBoardCost: 300
      minTransferTime: 600
      walkSpeed: 1.7
    ) {
      itineraries {
        walkDistance
        duration
        startTime
        endTime
        legs {
          mode
          trip {
            routeShortName
          }
        }
      }
    }
  }
`;
