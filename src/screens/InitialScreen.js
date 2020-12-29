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
