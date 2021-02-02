import React, {useContext, useEffect} from 'react';
import {StyleSheet, Text, FlatList, TouchableOpacity, View} from 'react-native';

import {UserContext, AuthContext} from '../components/context';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import {GET_ASSET_BY_USER} from '../graphql/requests';
import {GRAPHQL_URI} from '../config/index';
import {
  DefaultView,
  TextHeadingPurp,
  BackButton,
} from '../components/generics/defaults';

export function AddAssetScreen({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const {user, setUser} = useContext(UserContext);
  const [asset, setAsset] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState(null);

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

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <DefaultView>
      <BackButton onPress={() => navigation.goBack()} />
      <>
        <View style={styles.header}>
          <View style={styles.headText}>
            <TextHeadingPurp text="Create an Asset" />
          </View>
        </View>
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
  header: {
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
  },
  headText: {
    marginLeft: 100,
    marginTop: 4,
    textAlign: 'center',
    alignItems: 'center',
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
});
