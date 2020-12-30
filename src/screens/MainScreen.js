import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text, Button, FlatList} from 'react-native';
import {AuthContext, UserContext} from '../components/context';
import {useQuery} from '@apollo/client';

import {GET_ASSET_BY_USER} from '../graphql/requests';

export function MainScreen() {
  const {signOut} = React.useContext(AuthContext);

  const {user, setUser} = useContext(UserContext);

  const {loading: assetLoading, error, data: assetData} = useQuery(
    GET_ASSET_BY_USER,
    {
      variables: {
        // userId,
      },
      fetchPolicy: 'cache-first',
    },
  );

  return (
    <View style={styles.container}>
      <Text>HELLO {user.userName}</Text>
      <Text>Your email is {user.userEmail}</Text>
      {/* <FlatList data={}></FlatList> */}
      <Button
        title={'Logout'}
        style={styles.button}
        onPress={() => signOut()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'blue',
  },
});
