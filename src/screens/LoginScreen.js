import React from 'react';
import axios from 'axios';

import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import {BASE_LOGIN_URI} from '../config';
import {AuthContext, UserContext} from '../components/context';
import {Loader} from '../components/loader';

const background = require('../assets/images/login_bg.jpg');
const {width, height} = Dimensions.get('window');

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

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
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
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
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
        return;
      });
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={background}
        style={styles.background}
        resizeMode="cover">
        <View style={styles.halfHeight}></View>
        <View style={styles.quarterHeight}>
          {isLoading ? (
            <Loader
              text="Logging you in now"
              background={styles.inputBackground}
            />
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.container}>
              <View style={styles.inputBackground}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Your Username"
                  placeholderTextColor="#666666"
                  autoCapitalize="none"
                  onChangeText={(val) => textInputChange(val)}
                  onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                />

                <TextInput
                  style={styles.textInput}
                  placeholder="Your Password"
                  placeholderTextColor="#666666"
                  secureTextEntry={data.secureTextEntry ? true : false}
                  autoCapitalize="none"
                  onChangeText={(val) => handlePasswordChange(val)}
                />

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    loginHandle(data.username, data.password);
                  }}>
                  <Text styles={styles.text}>Sign In</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    signOut();
                  }}>
                  <Text styles={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
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
  button: {
    backgroundColor: 'lightblue',
    margin: 5,
    width: 200,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: 250,
    borderColor: 'lightblue',
    borderWidth: 1,
    margin: 10,
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
    backgroundColor: '#fff',
    borderColor: 'lightblue',
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
});
