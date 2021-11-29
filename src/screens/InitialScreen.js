import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {
  DefaultButton,
  DefaultView,
  TextWhite,
} from '../components/generics/defaults';

const logo = '../assets/images/logo.png';

export function InitialScreen({navigation}) {
  return (
    <DefaultView>
      <View style={styles.container}>
        <Image source={require(logo)} alt="Logo Image" style={styles.logo} />


        <DefaultButton
          text="Login"
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
        />

        <DefaultButton
          text="Sign Up"
          onPress={() => {
            navigation.navigate('RegisterScreen');
          }}
          style={styles.button}
        />

        <View style={styles.text}>
          <TextWhite
            text="I don't know man, Italy, Greece, Argentina... It's fine, everythings is
        fine. theres an infinite number of realities Morty, and in a few dozens
        of those i got lucky and turned everything back to normal."
          />
        </View>
      </View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 300,
    width: 300,
  },
  text: {
    marginTop: 50,
    width: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
});
