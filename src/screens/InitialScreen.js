import React, {useState} from 'react';

import {View, StyleSheet, Text, Button} from 'react-native';
import {LOCAL_LOGIN_URI, LOCAL_LOGIN_URI_LAPTOP} from '../config';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

export function InitialScreen({navigation}) {
  async function login() {
    console.log('sup');
    await axios
      .post(LOCAL_LOGIN_URI_LAPTOP, {
        identifier: 'test@gmail.com',
        password: 'test1234',
      })
      .then((response) => {
        console.log(response.data.jwt);
        AsyncStorage.setItem('id_token', response.data.jwt);
        navigation.navigate('LoginScreen');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to Digital Business keys</Text>
      <Button title={'Login'} style={styles.button} onPress={login} />
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
