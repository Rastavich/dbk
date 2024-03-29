import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {
  DefaultHeader,
  DefaultView,
  DefaultButton,
} from '../components/generics/defaults';

import {AuthContext} from '../components/context';
import {REGISTER_USER, CREATE_ASSET} from '../graphql/requests';
import {Loader} from '../components/loader';
import * as api from '../services/api';

const logo = '../assets/images/logo.png';
var theme = require('../styles/theme');

export function RegisterScreen({navigation}) {
  const {signUp} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    userEmail: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  async function register() {
    setIsLoading(true);
    let _input = {
      username: data.username,
      email: data.userEmail,
      password: data.password,
    };

    const response = await api.post(_input, REGISTER_USER, '');

    if (!response) {
      setIsLoading(false);
      Alert.alert('Sorry!', 'There was an error processing your request.', [
        {text: 'Okay'},
      ]);
      return;
    }

    if (response.data.errors) {
      response.data.errors.map(function (err) {
        if (err.extensions.exception.code == 400) {
          err.extensions.exception.data.message.map(function (errMsg) {
            if (errMsg) {
              errMsg.messages.map(function (messages) {
                console.log(messages);
                Alert.alert('Error:', messages.message, [{text: 'Okay'}]);
                setIsLoading(false);
                return;
              });
            }
          });
        }
      });
    }

    const id = {
      data: {
        user: response.data.data.register.user.id,
      },
    };

    let foundUser = {
      userToken: response.data.data.register.jwt,
      userName: response.data.data.register.user.username,
      userEmail: response.data.data.register.user.email,
    };

    setIsLoading(false);
    signUp(foundUser);

    /* Create the digital asset when the user registers an account and we have the ID */
    const setupDigitalAsset = await api.post(
      id.data,
      CREATE_ASSET,
      foundUser.userToken,
    );
  }

  const userInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const userEmailInputChange = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        userEmail: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        userEmail: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
      });
    }
  };

  const handleValidUser = (val) => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  return (
    <>
      <DefaultView>
        <DefaultHeader onPress={() => navigation.goBack()} />
        <View style={styles.quarterHeight}>
          {isLoading ? (
            <>
              <Image
                source={require(logo)}
                alt="Logo Image"
                style={styles.logo}
              />
              <Loader
                text="Logging you in now"
                background={styles.inputBackground}
              />
            </>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <Image
                source={require(logo)}
                alt="Logo Image"
                style={styles.logo}
              />
              <View style={styles.inputBackground}>
                <TextInput
                  style={theme.textInput}
                  placeholder="Your Username"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => userInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />
                <TextInput
                  style={theme.textInput}
                  placeholder="Your Email"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => userEmailInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

                <TextInput
                  style={theme.textInput}
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />

                <DefaultButton
                  onPress={() => {
                    register();
                  }}
                  text="Sign Up!"
                />
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </DefaultView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#111827',
  },
  halfHeight: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quarterHeight: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    height: 40,
    width: 250,
    margin: 10,
  },
  buttonText: {},
  inputBackground: {
    backgroundColor: '#111827',
    borderColor: '#6366F1',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  loadingIndicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 300,
    width: 300,
  },
});
