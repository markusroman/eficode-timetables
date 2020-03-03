import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
import { mainTheme, darkTheme } from './AppStyles';
import Timetable from './ts-components/Timetable';
import BackgroundMap from './components/BackgroundMap';
// eslint-disable-next-line no-unused-vars
import TestMap from './components/TestMap';

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Timetable />
      <BackgroundMap />
    </ThemeProvider>
  );
};

export default App;
