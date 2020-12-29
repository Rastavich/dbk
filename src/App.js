import React from 'react';
import {InitialScreen} from './screens/InitialScreen';
import {LoginScreen} from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: 'http://localhost:1337/graphql',
  cache: new InMemoryCache(),
});

export default function () {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}>
          <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
          <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
