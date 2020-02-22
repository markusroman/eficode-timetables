import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

// eslint-disable-next-line no-unused-vars
import { mainTheme, darkTheme } from './AppStyles';
import Timetable from './components/Timetable';

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Timetable />
    </ThemeProvider>
  );
};

export default App;
