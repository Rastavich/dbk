import React from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import {TextWhite, DefaultView} from '../components/generics/defaults';

export function Loader(props) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <DefaultView>
        <TextWhite text={props.text} />
        <ActivityIndicator style={styles.loader} size="large" color="#F3F4F6" />
      </DefaultView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});
