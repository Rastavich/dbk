import {HttpLink, ApolloLink, concat} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import {GRAPHQL_URL} from '../config';

const httpLink = new HttpLink({uri: GRAPHQL_URL});

async function getAuth() {
  const userToken = await AsyncStorage.getItem('userToken');
  return userToken;
}

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: 'bearer ' + getAuth,
    },
  });
  return forward(operation);
});

export const link = concat(authLink, httpLink);
