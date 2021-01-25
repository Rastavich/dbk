'use strict';

var React = require('react-native');

var {StyleSheet} = React;

module.exports = StyleSheet.create({
  // Buttons
  defaultButton: {
    backgroundColor: '#6366F1',
    margin: 5,
    width: 250,
    height: 60,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  defaultButtonText: {
    color: '#F3F4F6',
  },
  backButton: {},

  // Text
  textInput: {
    height: 40,
    width: 250,
    backgroundColor: '#F3F4F6',
    borderColor: '#F3F4F6',
    borderWidth: 1,
    margin: 10,
  },
  textWhite: {
    color: '#F3F4F6',
    alignContent: 'center',
    textAlign: 'center',
  },

  // Containers
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#111827',
  },
});
