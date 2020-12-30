import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {View, StyleSheet, Text, Button, FlatList} from 'react-native';
import {AuthContext} from '../components/context';
import {useQuery} from '@apollo/client';

import {GET_ASSET_BY_USER} from '../graphql/requests';

export function MainScreen() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [userToken, setUserToken] = useState('');
  const {signOut} = React.useContext(AuthContext);

  //   useEffect(() => {
  AsyncStorage.getItem('userToken').then((value) => {
    return setUserToken(value);
  });
  AsyncStorage.getItem('userName').then((value) => {
    return setUserName(value);
  });
  AsyncStorage.getItem('userEmail').then((value) => {
    return setUserEmail(value);
  });
  AsyncStorage.getItem('userId').then((value) => {
    return setUserId(value);
  });

  const {loading: assetLoading, error, data: assetData} = useQuery(
    GET_ASSET_BY_USER,
    {
      variables: {
        userId,
      },
      fetchPolicy: 'cache-first',
    },
  );

  return (
    <View style={styles.container}>
      <Text>HELLO {userName}</Text>
      <Text>Your email is {userEmail}</Text>
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
