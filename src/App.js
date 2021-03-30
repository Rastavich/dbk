import React, {useEffect, useState, useMemo} from 'react';
import {InitialScreen} from './screens/InitialScreen';
import {LoginScreen} from './screens/LoginScreen';
import {MainScreen} from './screens/MainScreen';
import {RegisterScreen} from './screens/RegisterScreen';
import {SettingsScreen} from './screens/SettingsScreen';
import {DetailsScreen} from './screens/DetailsScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';
import {ActivityIndicator, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {link} from './graphql/link';
import {AuthContext, UserContext} from './components/context';
import {GRAPHQL_URI} from './config/index';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

export default function () {
  const [user, setUser] = useState('');

  const providerValue = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user, setUser],
  );

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
        } finally {
          setUser({userName, userEmail, userId});
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
      signUp: async (foundUser) => {
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
        } finally {
          setUser({userName, userEmail, userId});
        }
        dispatch({
          type: 'REGISTER',
          id: userId,
          token: userToken,
          userName: userName,
          userEmail: userEmail,
        });
      },
    }),
    [],
  );

  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_TOKEN', token: userToken});
    }, 1000);
  }, []);

  const client = new ApolloClient({
    uri: GRAPHQL_URI,
    cache: new InMemoryCache(),
    headers: {
      authorization: `Bearer ${loginState.userToken}`,
    },
  });

  if (loginState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <AuthContext.Provider value={authContext}>
      <UserContext.Provider value={providerValue}>
        <ApolloProvider client={client}>
          <NavigationContainer>
            {loginState.userToken !== null ? (
              <>
                <Tab.Navigator
                  tabBarOptions={{
                    activeTintColor: '#FFFFFF',
                    inactiveTintColor: '#000',
                    style: {backgroundColor: '#111827'},
                    labelStyle: {
                      textAlign: 'center',
                      color: '#fff',
                    },
                    indicatorStyle: {
                      borderBottomColor: '#111827',
                    },
                  }}>
                  <Tab.Screen name={'Assets'} component={MainScreen} />
                  <Tab.Screen name={'Settings'} component={SettingsScreen} />
                </Tab.Navigator>
                <Stack.Screen
                  name={'DetailsScreen'}
                  component={DetailsScreen}
                />
              </>
            ) : (
              // <Stack.Navigator>
              //   <Stack.Screen name={'MainScreen'} component={MainScreen} />
              // </Stack.Navigator>
              <Stack.Navigator
                screenOptions={{
                  headerBackTitleVisible: false,
                  headerShown: false,
                  headerTintColor: 'black',
                }}>
                <Stack.Screen
                  name={'InitialScreen'}
                  component={InitialScreen}
                />
                <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
                <Stack.Screen
                  name={'RegisterScreen'}
                  component={RegisterScreen}
                />
              </Stack.Navigator>
            )}
          </NavigationContainer>
        </ApolloProvider>
      </UserContext.Provider>
    </AuthContext.Provider>
  );
}
