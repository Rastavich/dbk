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
  DefaultHeader: {},

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
  textPurp: {
    color: '#6366F1',
    fontSize: 18,
    alignContent: 'center',
    textAlign: 'center',
    width: '100%',
  },

  // Containers
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  DefaultHeader: {
    left: 5,
    marginTop: 5,
    width: 24,
    height: 24,
  },
  header: {
    flexDirection: 'row',
    display: 'flex',
    textAlign: 'center',
  },
  headText: {
    textAlign: 'center',
    alignItems: 'center',
  },
});
