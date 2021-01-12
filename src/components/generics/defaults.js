import React from 'react';
import {TouchableOpacity, Text, View, Image} from 'react-native';
var theme = require('../../styles/theme');

export function DefaultButton({text, onPress}) {
  return (
    <TouchableOpacity style={theme.defaultButton} onPress={onPress}>
      <Text style={theme.defaultButtonText}>{text}</Text>
    </TouchableOpacity>
  );
}

export function DefaultView({...props}) {
  return <View style={theme.container}>{props.children}</View>;
}

export function TextWhite({text}) {
  return <Text style={theme.textWhite}>{text}</Text>;
}

export function TextHeadingWhite({text}) {}

export function BackButton({onPress}) {
  return (
    <TouchableOpacity style={theme.backButton} onPress={onPress}>
      <Image
        // style={styles.tinyLogo}
        source={require('../../assets/icons/backButton.svg')}
      />
    </TouchableOpacity>
  );
}
