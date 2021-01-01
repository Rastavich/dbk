import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet, Text, Button, FlatList} from 'react-native';
import {AuthContext, UserContext} from '../components/context';
import {useQuery} from '@apollo/client';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {Card} from '../components/card';

export function MainScreen() {
  const {signOut} = React.useContext(AuthContext);

  const {user, setUser} = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Text>HELLO {user.userName}</Text>
      <Text>Your email is {user.userEmail}</Text>
      {/* <FlatList data={}></FlatList> */}
      <Card>
        <Text>{user.userEmail}</Text>
      </Card>
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
