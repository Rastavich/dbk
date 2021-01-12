import React from 'react';
import {Image, Text} from 'react-native';
import {
  DefaultButton,
  DefaultView,
  TextWhite,
} from '../components/generics/defaults';

export function InitialScreen({navigation}) {
  return (
    <DefaultView>
      <Image alt="Logo Image"></Image>
      <Text style={{fontSize: 38, color: 'white'}}>Digital Business keys</Text>

      <DefaultButton
        text="Sign In"
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      />

      <DefaultButton
        text="Sign Up"
        onPress={() => {
          navigation.navigate('RegisterScreen');
        }}
      />

      <TextWhite
        text="I don't know man, Italy, Greece, Argentina... It's fine, everythings is
        fine. theres an infinite number of realities Morty, and in a few dozens
        of those i got lucky and turned everything back to normal. Shadow
        Jacker, you haven't come out of your masturbation cave in eons! Allahu
        blehhhh Akbar!"
      />
    </DefaultView>
  );
}
