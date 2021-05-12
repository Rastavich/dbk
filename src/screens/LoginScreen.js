import React from 'react';
import axios from 'axios';

import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Image,
} from 'react-native';
import {
  DefaultButton,
  DefaultView,
  DefaultHeader,
} from '../components/generics/defaults';

import {BASE_LOGIN_URI} from '@env';
import {AuthContext, UserContext} from '../components/context';
import {Loader} from '../components/loader';

const {width, height} = Dimensions.get('window');
var theme = require('../styles/theme');
const logo = '../assets/images/logo.png';

export function LoginScreen({navigation}) {
  const {user, setUser} = React.useContext(UserContext);
  const {signIn, signOut} = React.useContext(AuthContext);
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const textInputChange = (val) => {
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

  async function loginHandle(userName, password) {
    setIsLoading(true);
    let foundUser = {
      userToken: '',
      userName: userName,
      password: password,
      id: '',
      type: '',
      userEmail: '',
    };

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      setIsLoading(false);
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      setIsLoading(false);
      return;
    }

    await axios
      .post(BASE_LOGIN_URI, {
        identifier: userName,
        password: password,
      })
      .then((response) => {
        console.log(response.data);
        foundUser = {
          userToken: response.data.jwt,
          userId: response.data.user.id,
          userName: response.data.user.username,
          userEmail: response.data.user.email,
        };
        setIsLoading(false);
        setUser(response.data);
        signIn(foundUser);
      })
      .catch((err) => {
        console.log(err);
        Alert.alert('Invalid User!', 'Username or password is incorrect.', [
          {text: 'Okay'},
        ]);
        setIsLoading(false);
        return;
      });
  }

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
                  onChangeText={(val) => textInputChange(val)}
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
                  text="Sign In"
                  onPress={() => {
                    loginHandle(data.username, data.password);
                  }}
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
    flex: 0,
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
  background: {
    width,
    height,
  },
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
