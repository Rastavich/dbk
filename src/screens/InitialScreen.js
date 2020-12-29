import React from 'react';

import {View, StyleSheet, Text, Button} from 'react-native';
import {LOCAL_LOGIN_URI} from '../config';
import axios from 'axios';

async function login() {
  const {data} = await axios.post(LOCAL_LOGIN_URI, {
    identifier: 'test@gmail.com',
    password: 'test1234',
  });

  console.log(data);

  if (data) {
    navigation.navigate('LoginScreen');
  } else {
    console.log('Incorrect');
  }
}

export function InitialScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Digital Business keys</Text>
      <Button
        title={'Login'}
        style={styles.button}
        onPress={() => {
          login;
        }}
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
