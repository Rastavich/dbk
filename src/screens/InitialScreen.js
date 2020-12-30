import React, {useState} from 'react';

import {View, StyleSheet, Text, Button} from 'react-native';

export function InitialScreen({navigation}) {
  function login() {
    navigation.navigate('LoginScreen');
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
