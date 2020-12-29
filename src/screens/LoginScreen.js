import React from 'react';

import {View, StyleSheet, Text, FlatList, Button} from 'react-native';
import {useQuery} from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_USER_BY_ID} from '../graphql/requests';

export function LoginScreen() {
  const {data, loading, error} = useQuery(GET_USER_BY_ID);

  // if (loading || error) return null;

  function test() {
    AsyncStorage.getItem('id_token').then((value) => {
      console.log(value);
      return value;
    });
  }

  if (!test) return null;

  return (
    <View style={styles.container}>
      {/* <FlatList
        data={data.digitalAssets}
        renderItem={({item}) => <Text>{item.url}</Text>}
      /> */}
      <Button onPress={test} title="test" />
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
