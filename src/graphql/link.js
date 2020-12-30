import {HttpLink, ApolloLink, concat} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import {GRAPHQL_URL} from '../config';

const httpLink = new HttpLink({uri: GRAPHQL_URL});
const userToken = await AsyncStorage.getItem('userToken');

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      authorization: 'bearer ' + userToken,
    },
  });
  return forward(operation);
});

export const link = concat(authLink, httpLink);
