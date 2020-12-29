import React from 'react';
import {InitialScreen} from './screens/InitialScreen';
import {LoginScreen} from './screens/LoginScreen';
import {NavigationContainer} from '@react-navigation/native';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {createStackNavigator} from '@react-navigation/stack';
import {BASE_URI_LOCAL} from './config';
import {LOCAL_GRAPHQL_URI_LAPTOP} from './config';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: LOCAL_GRAPHQL_URI_LAPTOP,
  cache: new InMemoryCache(),
});

export default function () {
  function logout() {
    AsyncStorage.removeItem('id_token').then((value) => {
      console.log(value);
    });
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerBackTitleVisible: false,
            headerTintColor: 'black',
          }}>
          <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
          <Stack.Screen
            name={'LoginScreen'}
            component={LoginScreen}
            options={{
              headerRight: () => <Button onPress={logout} title="logout" />,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
