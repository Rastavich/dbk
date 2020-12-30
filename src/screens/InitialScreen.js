import React from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

export function InitialScreen({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Welcome to Digital Business keys</Text>

      <Button
        title={'Login'}
        style={styles.button}
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      />

      <Text>Don't have an account?</Text>
      <Button
        title={'Register'}
        style={styles.button}
        onPress={() => {
          navigation.navigate('RegisterScreen');
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
