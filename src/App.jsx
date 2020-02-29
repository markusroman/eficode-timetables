import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
import { mainTheme, darkTheme } from './AppStyles';
import Timetable from './components/Timetable';
import BackgroundMap from './components/BackgroundMap';

const App = () => {
  return (
    <>
      <ThemeProvider theme={mainTheme}>
        <Timetable />
      </ThemeProvider>
      <BackgroundMap />
    </>
  );
};

export default App;
