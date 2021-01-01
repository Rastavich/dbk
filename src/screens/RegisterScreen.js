import React from 'react';
import {View, StyleSheet, Text, Button, TextInput} from 'react-native';

import {AuthContext} from '../components/context';
import {useMutation} from '@apollo/client';
import {REGISTER_USER} from '../graphql/requests';

export function RegisterScreen() {
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

  let userName = data.username;
  let pass = data.password;
  let email = data.userEmail;

  console.log(userName, pass, email);
  const [register, {error}] = useMutation(REGISTER_USER, {
    variables: {userName, email, pass},
  });
  if (error) {
    console.log(error);
  }
  if (register) {
    console.log(register);
    // let foundUser = {
    //   userToken: register.data.jwt,
    //   userName: userName,
    //   password: password,
    //   userEmail: userEmail,
    // };
    // signUp(foundUser);
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
      {data.check_textInputChange ? <View></View> : null}
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

      <Button onPress={register} title="Sign Up!" />
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
