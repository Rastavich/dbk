import React, {useState} from 'react';
import axios from 'axios';
import {AuthContext} from '../components/context';
import {GRAPHQL_URL} from '../config/index';
import {useQuery} from '@apollo/client';

import {View, StyleSheet, Text, Button, TextInput} from 'react-native';

export function RegisterScreen({navigation}) {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signUp} = React.useContext(AuthContext);

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

  async function registerHandle(userName, userEmail, password) {
    let foundUser = {
      userToken: '',
      userName: '',
      id: '',
      type: '',
      userEmail: '',
    };

    const {loading: assetLoading, error, data: assetData} = useQuery(
      GET_ASSET_BY_USER,
      {
        variables: {
          // userId,
        },
        fetchPolicy: 'cache-first',
      },
    );

    await axios
      .post(GRAPHQL_URL, {
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
      })
      .catch((err) => {
        console.log(err);
      });

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
    signUp(foundUser);
  }

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput
        placeholder="Your Username"
        placeholderTextColor="#666666"
        autoCapitalize="none"
        onChangeText={(val) => textInputChange(val)}
        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
      />
      <Text>Email</Text>
      <TextInput
        placeholder="Your Email"
        placeholderTextColor="#666666"
        autoCapitalize="none"
        onChangeText={(val) => textInputChange(val)}
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

      <Button
        onPress={() => {
          registerHandle(data.username, data.password, data.userEmail);
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
