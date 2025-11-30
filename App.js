import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Index from './components/titleScreen/TitleScreen';
import Home from './components/home/Home';
import Gallery from './components/gallery/Gallery';
import Camera from './components/navbar/navbarCam/NavBarCamera';
import ViewImage from './components/gallery/ViewImage/ViewImage';

const Stack = createStackNavigator();

const zoomInTransition = {
  cardStyleInterpolator: ({ current }) => {
    const progress = current.progress;

    return {
      cardStyle: {
        opacity: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
        }),
        transform: [
          {
            scale: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [1.02, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
        backgroundColor: '#fff',
      },
    };
  },
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
          ...zoomInTransition,
        }}
      >
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Gallery" component={Gallery} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="ViewImage" component={ViewImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
