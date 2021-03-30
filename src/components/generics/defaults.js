import React from 'react';
import Svg, {Rect, Polygon, G} from 'react-native-svg';
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

export function TextWhiteLink({text, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={theme.textWhite}>{text}</Text>
    </TouchableOpacity>
  );
}

export function DefaultHeader({onPress, text}) {
  return (
    <>
      {onPress && (
        <TouchableOpacity style={theme.DefaultHeader} onPress={onPress}>
          <Svg
            enable-background="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24">
            <Rect fill="none" height="24" width="24" backgroundColor="white" />
            <G>
              <Polygon
                points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"
                fill="white"
              />
            </G>
          </Svg>
        </TouchableOpacity>
      )}
      <Text style={theme.textPurp}>{text}</Text>
    </>
  );
}
