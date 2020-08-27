import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MovieListScreen from './screens/MovieListScreen';
import MovieDetailedScreen from './screens/MovieDetailedScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MovieListScreen" component={MovieListScreen} />
      <Stack.Screen name="MovieDetailedScreen" component={MovieDetailedScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}