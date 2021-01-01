import React from 'react';
import {View, StyleSheet, Text, Button, TextInput, Alert} from 'react-native';

import {AuthContext} from '../components/context';
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import axios from 'axios';

export function RegisterScreen() {
  console.log(GRAPHQL_URI);
  const {signUp} = React.useContext(AuthContext);
  const [data, setData] = React.useState({
    username: '',
    password: '',
    userEmail: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  function register() {
    var loginData = JSON.stringify({
      query: `mutation registerUser($username: String!, $email: String!, $password: String!) {
        register(input: {username: $username, email: $email, password: $password}) {
            jwt
        }
    }`,
      variables: {
        username: data.username,
        email: data.userEmail,
        password: data.password,
      },
    });

    var config = {
      method: 'post',
      url: GRAPHQL_URI,
      headers: {
        'Content-Type': 'application/json',
      },
      data: loginData,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        if (response.data.data.register.jwt) {
          let foundUser = {
            userToken: response.data.data.register.jwt,
            userName: username,
            password: password,
            userEmail: userEmail,
          };
          signUp(foundUser);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(config);
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
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        placeholder="Your Username"
        placeholderTextColor="#666666"
        autoCapitalize="none"
        onChangeText={(val) => userInputChange(val)}
        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
      />
      <Text>Email</Text>
      <TextInput
        placeholder="Your Email"
        placeholderTextColor="#666666"
        autoCapitalize="none"
        onChangeText={(val) => userEmailInputChange(val)}
        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
      />
      <Text>Password</Text>
      <View>
        <TextInput
          placeholder="Your Password"
          placeholderTextColor="#666666"
          secureTextEntry={data.secureTextEntry ? true : false}
          autoCapitalize="none"
          onChangeText={(val) => handlePasswordChange(val)}
        />
      </View>

      <Button
        onPress={() => {
          register();
        }}
        title="Sign Up!"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: 'blue',
  },
});
