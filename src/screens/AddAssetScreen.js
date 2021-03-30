import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Button,
} from 'react-native';

import {UserContext, AuthContext} from '../components/context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import {
  DefaultView,
  DefaultHeader,
  DefaultButton,
} from '../components/generics/defaults';

export function AddAssetScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

  var theme = require('../styles/theme');
  let data = [];

  async function getAuth() {
    const userToken = await AsyncStorage.getItem('userToken');

    console.log(['USER TOKEN: ', userToken]);
    console.log(['USER: ', user]);

    if (user == '') {
      signOut();
    }

    var loginData = JSON.stringify({
      query: GET_ASSET_BY_USER,
      variables: {
        id: user.userId,
      },
    });

    var config = {
      method: 'post',
      url: GRAPHQL_URI,
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + userToken,
      },
      data: loginData,
    };
    await axios(config)
      .then(function (response) {
        response.data.data.user.digital_assets.map(function (asset) {
          asset.websites.map(function (site) {
            data.push(site);
          });
        });

        setAsset(data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

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

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <DefaultView>
      <DefaultHeader
        onPress={() => navigation.goBack()}
        text="Create an Asset"
      />
      <>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}>
          <View style={styles.inputBackground}>
            <View style={styles.fixToText}>
              <Button
                title="Left button"
                onPress={() => Alert.alert('Left button pressed')}
              />
              <Button
                title="Right button"
                onPress={() => Alert.alert('Right button pressed')}
              />
            </View>
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
      </>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    height: 75,
    marginVertical: 8,
    marginHorizontal: 16,
    zIndex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  pill: {
    backgroundColor: '#fff',
    borderRadius: 5,
    width: 160,
    borderColor: '#000',
    zIndex: 10,
    padding: 3,
    marginRight: 10,
  },
  cardContent: {
    margin: 2,
    display: 'flex',
    flexDirection: 'row',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
