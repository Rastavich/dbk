import React, {useEffect, useState, useMemo} from 'react';
import {InitialScreen} from './screens/InitialScreen';
import {LoginScreen} from './screens/LoginScreen';
import {MainScreen} from './screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {ActivityIndicator, Button, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {BASE_URI} from './config';
import {AuthContext} from './components/context';

const Stack = createStackNavigator();

const client = new ApolloClient({
  uri: BASE_URI,
  cache: new InMemoryCache(),
});

export default function () {
  const initialLoginState = {
    isLoading: true,
    userName: null,
    userEmail: null,
    userToken: null,
    id: null,
    type: null,
  };

  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.userName,
          userToken: action.token,
          userId: action.id,
          userEmail: action.userEmail,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          userEmail: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(
    loginReducer,
    initialLoginState,
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (foundUser) => {
        // console.log(foundUser);
        const userToken = foundUser.userToken;
        const userId = foundUser.userId;
        const userName = foundUser.userName;
        const userEmail = foundUser.userEmail;
        try {
          await AsyncStorage.setItem('userToken', userToken);
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('userEmail', userEmail);
          await AsyncStorage.setItem('userId', JSON.stringify(userId));
        } catch (e) {
          console.log(e);
        }
        // console.log('user token: ', userToken);
        dispatch({
          type: 'LOGIN',
          id: userId,
          token: userToken,
          userName: userName,
          userEmail: userEmail,
        });
      },
      signOut: async () => {
        // setUserToken(null);
        // setIsLoading(false);
        try {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('userId');
          await AsyncStorage.removeItem('userName');
          await AsyncStorage.removeItem('userEmail');
        } catch (e) {
          console.log(e);
        }
        dispatch({type: 'LOGOUT'});
      },
      signUp: () => {
        // setUserToken('fgkj');
        // setIsLoading(false);
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      // setIsLoading(false);
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {loginState.userToken !== null ? (
            <Stack.Navigator>
              <Stack.Screen name={'MainScreen'} component={MainScreen} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{
                headerBackTitleVisible: false,
                headerTintColor: 'black',
              }}>
              <Stack.Screen name={'InitialScreen'} component={InitialScreen} />
              <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </AuthContext.Provider>
  );
}
