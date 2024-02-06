/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Navigation from './src/navigation/Navigation';
import { EventProvider } from './src/static-data/eventLists/EventContext';
function App(): React.JSX.Element {
  return (
    <EventProvider>
      <Navigation />
    </EventProvider>
  );
}
export default App;
