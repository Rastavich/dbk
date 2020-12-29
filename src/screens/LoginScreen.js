import React from 'react';

import {View, StyleSheet, Text, FlatList} from 'react-native';
import {useQuery} from '@apollo/client';

import {GET_USER_BY_ID} from '../graphql/requests';

export function LoginScreen() {
  const {data, loading, error} = useQuery(GET_USER_BY_ID);

  if (loading || error) return null;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.digitalAssets}
        renderItem={({item}) => <Text>{item.url}</Text>}
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
