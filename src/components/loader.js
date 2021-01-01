import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';

export function Loader(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={props.background}>
        <Text>{props.text}</Text>
        <ActivityIndicator style={styles.loader} size="large" color="black" />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  loader: {
    height: 40,
    width: 250,
    margin: 10,
  },
});
